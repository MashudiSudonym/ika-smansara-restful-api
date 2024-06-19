import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Category.createMany([
      {
        name: 'pendidikan',
      },
      {
        name: 'beasiswa',
      },
      {
        name: 'yatama/dhuafa',
      },
      {
        name: 'panti asuhan',
      },
      {
        name: 'kemanusiaan',
      },
      {
        name: 'bencana alam',
      },
      {
        name: 'rumah ibadah',
      },
      {
        name: 'lingkungan',
      },
      {
        name: 'disabilitas',
      },
      {
        name: 'medis & kesehatan',
      },
      {
        name: 'reuni',
      },
    ])
  }
}
