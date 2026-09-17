import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/lib/db'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const agencyId = formData.get('agencyId') as string
    const propertyId = formData.get('propertyId') as string
    const tenantId = formData.get('tenantId') as string | null
    const type = formData.get('type') as string
    const description = formData.get('description') as string
    const urgency = formData.get('urgency') as string

    if (!agencyId || !propertyId || !type || !description || !urgency) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      )
    }

    // Create ticket
    const ticket = await prisma.ticket.create({
      data: {
        agencyId,
        propertyId,
        tenantId: tenantId || undefined,
        type,
        description,
        urgency,
        status: 'nouveau',
        timeline: {
          create: {
            status: 'nouveau',
            note: 'Demande créée par le locataire',
          },
        },
      },
    })

    // Handle photos
    const photos = formData.getAll('photos') as File[]
    if (photos.length > 0) {
      const uploadDir = join(process.cwd(), 'public', 'uploads', ticket.id)
      await mkdir(uploadDir, { recursive: true })

      for (const photo of photos) {
        const buffer = Buffer.from(await photo.arrayBuffer())
        const filename = `${nanoid()}-${photo.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        const filepath = join(uploadDir, filename)
        
        await writeFile(filepath, buffer)
        
        await prisma.ticketPhoto.create({
          data: {
            ticketId: ticket.id,
            filename,
          },
        })
      }
    }

    return NextResponse.json({ success: true, ticketId: ticket.id })
  } catch (error) {
    console.error('Error creating ticket:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la demande' },
      { status: 500 }
    )
  }
}
