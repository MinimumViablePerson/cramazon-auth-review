import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const items: Prisma.ItemCreateInput[] = [
  {
    title: 'Socks',
    image: 'socks.jpg',
    price: 2.99
  },
  {
    title: 'Flat Cap',
    image: 'flatcap.jpg',
    price: 3.99
  },
  {
    title: 'Glasses',
    image: 'glasses.jpg',
    price: 5.99
  }
]

const users: Prisma.UserCreateInput[] = [
  {
    email: 'nicolas@email.com',
    password: bcrypt.hashSync('nicolas'),
    name: 'Nicolas',
    orders: {
      create: [
        { item: { connect: { title: 'Socks' } }, quantity: 10 },
        { item: { connect: { title: 'Flat Cap' } }, quantity: 15 },
        { item: { connect: { title: 'Glasses' } }, quantity: 5 }
      ]
    }
  },
  {
    email: 'arita@email.com',
    password: bcrypt.hashSync('arita'),
    name: 'Arita',
    orders: {
      create: [{ item: { connect: { title: 'Socks' } }, quantity: 5 }]
    }
  },
  {
    email: 'desintila@email.com',
    password: bcrypt.hashSync('desintila'),
    name: 'Desintila',
    orders: {
      create: [{ item: { connect: { title: 'Socks' } }, quantity: 9 }]
    }
  }
]

async function createStuff () {
  for (const item of items) {
    await prisma.item.create({ data: item })
  }

  for (const user of users) {
    await prisma.user.create({ data: user })
  }
}

createStuff()
