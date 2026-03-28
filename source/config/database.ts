import type { Mongoose } from 'mongoose'
// eslint-disable-next-line no-duplicate-imports
import mongoose from 'mongoose'

class Database {
  private connection?: Mongoose

  async connect() {
    if (this.connection) {
      return this.connection
    }
    const URI = process.env.MONGODB_URI || ''
    if (!URI) {
      throw new Error('URI inválida para conexão com o banco')
    }
    this.connection = await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 5000
    })
  }

  async disconnect() {
    if (this.connection) {
      await mongoose.disconnect()
    }
  }
}

export const database = new Database()
