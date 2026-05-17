import type { Mongoose } from 'mongoose'
// eslint-disable-next-line no-duplicate-imports
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

enum Environment {
  Development = 'development',
  Production = 'production'
}

const environmentToUri: Record<Environment, string | undefined> = {
  [Environment.Development]: process.env.MONGODB_URI_LOCAL,
  [Environment.Production]: process.env.MONGODB_URI_PROD
}

class Database {
  private connection?: Mongoose

  async connect() {
    const URI = environmentToUri[process.env.NODE_ENV as Environment] || ''
    if (!URI) {
      throw new Error('URI inválida para conexão com o banco')
    }

    if (process.env.NODE_ENV === Environment.Development) {
      let cached = (global as any).mongoose as
        | { conn: Mongoose | null; promise: Promise<Mongoose> | null }
        | undefined
      if (!cached) {
        cached = (global as any).mongoose = { conn: null, promise: null }
      }
      if (cached.conn) {
        return cached.conn
      }
      if (!cached.promise) {
        cached.promise = mongoose.connect(URI, {
          serverSelectionTimeoutMS: 5000
        })
      }
      cached.conn = await cached.promise
      return cached.conn
    } else {
      if (this.connection) {
        return this.connection
      }
      this.connection = await mongoose.connect(URI, {
        serverSelectionTimeoutMS: 5000
      })
      return this.connection
    }
  }

  async disconnect() {
    if (process.env.NODE_ENV === Environment.Development) {
      let cached = (global as any).mongoose as
        | { conn: Mongoose | null; promise: Promise<Mongoose> | null }
        | undefined
      if (cached && cached.conn) {
        await mongoose.disconnect()
        cached.conn = null
        cached.promise = null
      }
    } else {
      if (this.connection) {
        await mongoose.disconnect()
        this.connection = undefined
      }
    }
  }
}

export const database = new Database()
