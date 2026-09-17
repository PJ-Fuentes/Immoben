import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { TICKET_STATUS } from '@/lib/types'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, artisanId, note } = body

    const ticket = await prisma.ticket.findUnique({
      where: { id: params.id },
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    // Update ticket
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (status) {
      updateData.status = status
    }

    if (artisanId !== undefined) {
      updateData.artisanId = artisanId || null
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: params.id },
      data: updateData,
    })

    // Add timeline event
    if (status) {
      await prisma.ticketTimeline.create({
        data: {
          ticketId: params.id,
          status,
          note: note || undefined,
        },
      })
    }

    return NextResponse.json({ success: true, ticket: updatedTicket })
  } catch (error) {
    console.error('Error updating ticket:', error)
    return NextResponse.json(
      { error: 'Error updating ticket' },
      { status: 500 }
    )
  }
}
