import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Ben's agency
  const agency = await prisma.agency.create({
    data: {
      name: 'Ben Gestion Locative',
      email: 'ben@immoben.be',
      phone: '+32 2 123 45 67',
    },
  })

  console.log('✅ Agency created:', agency.name)

  // Create artisans
  const maBuild = await prisma.artisan.create({
    data: {
      agencyId: agency.id,
      name: 'MaBuild',
      specialty: 'Tous travaux',
      email: 'contact@mabuild.be',
      phone: '+32 2 234 56 78',
      isDefault: true,
    },
  })

  const plombier = await prisma.artisan.create({
    data: {
      agencyId: agency.id,
      name: 'Plomberie Express',
      specialty: 'Plomberie',
      email: 'info@plomberie-express.be',
      phone: '+32 2 345 67 89',
      isDefault: false,
    },
  })

  console.log('✅ Artisans created:', maBuild.name, plombier.name)

  // Create properties
  const property1 = await prisma.property.create({
    data: {
      agencyId: agency.id,
      address: 'Rue de la Loi 16',
      city: 'Bruxelles',
      postalCode: '1000',
      reference: 'BRU-001',
      token: nanoid(16),
    },
  })

  const property2 = await prisma.property.create({
    data: {
      agencyId: agency.id,
      address: 'Avenue Louise 54',
      city: 'Bruxelles',
      postalCode: '1050',
      reference: 'BRU-002',
      token: nanoid(16),
    },
  })

  const property3 = await prisma.property.create({
    data: {
      agencyId: agency.id,
      address: 'Rue Royale 89',
      city: 'Bruxelles',
      postalCode: '1000',
      reference: 'BRU-003',
      token: nanoid(16),
    },
  })

  const property4 = await prisma.property.create({
    data: {
      agencyId: agency.id,
      address: 'Chaussée de Charleroi 132',
      city: 'Bruxelles',
      postalCode: '1060',
      reference: 'BRU-004',
      token: nanoid(16),
    },
  })

  const property5 = await prisma.property.create({
    data: {
      agencyId: agency.id,
      address: 'Boulevard Anspach 23',
      city: 'Bruxelles',
      postalCode: '1000',
      reference: 'BRU-005',
      token: nanoid(16),
    },
  })

  console.log('✅ Properties created: 5 properties')

  // Create tenants
  const tenant1 = await prisma.tenant.create({
    data: {
      agencyId: agency.id,
      propertyId: property1.id,
      firstName: 'Sophie',
      lastName: 'Dubois',
      email: 'sophie.dubois@email.be',
      phone: '+32 470 12 34 56',
    },
  })

  const tenant2 = await prisma.tenant.create({
    data: {
      agencyId: agency.id,
      propertyId: property2.id,
      firstName: 'Marc',
      lastName: 'Laurent',
      email: 'marc.laurent@email.be',
      phone: '+32 471 23 45 67',
    },
  })

  const tenant3 = await prisma.tenant.create({
    data: {
      agencyId: agency.id,
      propertyId: property3.id,
      firstName: 'Julie',
      lastName: 'Martin',
      email: 'julie.martin@email.be',
      phone: '+32 472 34 56 78',
    },
  })

  const tenant4 = await prisma.tenant.create({
    data: {
      agencyId: agency.id,
      propertyId: property4.id,
      firstName: 'Thomas',
      lastName: 'Bernard',
      email: 'thomas.bernard@email.be',
      phone: '+32 473 45 67 89',
    },
  })

  const tenant5 = await prisma.tenant.create({
    data: {
      agencyId: agency.id,
      propertyId: property5.id,
      firstName: 'Emma',
      lastName: 'Petit',
      email: 'emma.petit@email.be',
      phone: '+32 474 56 78 90',
    },
  })

  console.log('✅ Tenants created: 5 tenants')

  // Create sample tickets
  const ticket1 = await prisma.ticket.create({
    data: {
      agencyId: agency.id,
      propertyId: property1.id,
      tenantId: tenant1.id,
      artisanId: plombier.id,
      type: 'fuite',
      description: 'Fuite d\'eau sous l\'évier de la cuisine. L\'eau coule doucement mais constamment.',
      urgency: 'haute',
      status: 'en_cours',
      timeline: {
        create: [
          { status: 'nouveau', note: 'Demande créée par le locataire' },
          { status: 'valide', note: 'Demande validée par l\'agence' },
          { status: 'envoye', note: 'Envoyé à Plomberie Express' },
          { status: 'en_cours', note: 'Intervention planifiée pour demain matin' },
        ],
      },
    },
  })

  const ticket2 = await prisma.ticket.create({
    data: {
      agencyId: agency.id,
      propertyId: property2.id,
      tenantId: tenant2.id,
      type: 'chaudiere',
      description: 'La chaudière ne démarre plus. Pas d\'eau chaude depuis ce matin.',
      urgency: 'haute',
      status: 'nouveau',
      timeline: {
        create: [
          { status: 'nouveau', note: 'Demande créée par le locataire' },
        ],
      },
    },
  })

  const ticket3 = await prisma.ticket.create({
    data: {
      agencyId: agency.id,
      propertyId: property3.id,
      tenantId: tenant3.id,
      artisanId: maBuild.id,
      type: 'humidite',
      description: 'Taches d\'humidité au plafond de la chambre principale. Odeur de moisi.',
      urgency: 'moyenne',
      status: 'valide',
      timeline: {
        create: [
          { status: 'nouveau', note: 'Demande créée par le locataire' },
          { status: 'valide', note: 'Demande validée - à envoyer à MaBuild' },
        ],
      },
    },
  })

  const ticket4 = await prisma.ticket.create({
    data: {
      agencyId: agency.id,
      propertyId: property4.id,
      tenantId: tenant4.id,
      type: 'code_ean',
      description: 'Demande du code EAN pour changement de fournisseur d\'énergie.',
      urgency: 'basse',
      status: 'resolu',
      timeline: {
        create: [
          { status: 'nouveau', note: 'Demande de code EAN' },
          { status: 'valide', note: 'Code EAN transmis au locataire' },
          { status: 'resolu', note: 'Demande clôturée' },
        ],
      },
    },
  })

  const ticket5 = await prisma.ticket.create({
    data: {
      agencyId: agency.id,
      propertyId: property5.id,
      tenantId: tenant5.id,
      type: 'electromenager',
      description: 'Le four ne chauffe plus correctement. Température instable.',
      urgency: 'basse',
      status: 'nouveau',
      timeline: {
        create: [
          { status: 'nouveau', note: 'Demande créée par le locataire' },
        ],
      },
    },
  })

  console.log('✅ Tickets created: 5 sample tickets')

  console.log('\n🎉 Seed completed successfully!\n')
  console.log('📋 Summary:')
  console.log('   - 1 agency (Ben Gestion Locative)')
  console.log('   - 2 artisans (MaBuild as default, Plomberie Express)')
  console.log('   - 5 properties')
  console.log('   - 5 tenants')
  console.log('   - 5 tickets (various statuses and types)')
  console.log('\n🔗 Tenant form URLs:')
  console.log(`   - ${property1.address}: http://localhost:3000/demande/${property1.token}`)
  console.log(`   - ${property2.address}: http://localhost:3000/demande/${property2.token}`)
  console.log(`   - ${property3.address}: http://localhost:3000/demande/${property3.token}`)
  console.log(`   - ${property4.address}: http://localhost:3000/demande/${property4.token}`)
  console.log(`   - ${property5.address}: http://localhost:3000/demande/${property5.token}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
