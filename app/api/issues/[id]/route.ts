import { NextResponse } from 'next/server';
import { mockIssues } from '@/lib/mockData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const issue = mockIssues.find(i => i.id === params.id);
  
  if (!issue) {
    return NextResponse.json(
      { error: 'Issue not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ issue });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const issue = mockIssues.find(i => i.id === params.id);
  
  if (!issue) {
    return NextResponse.json(
      { error: 'Issue not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    message: 'Issue updated successfully',
    issue: {
      ...issue,
      ...body,
      updatedAt: new Date(),
    },
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const issue = mockIssues.find(i => i.id === params.id);
  
  if (!issue) {
    return NextResponse.json(
      { error: 'Issue not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    message: 'Issue deleted successfully',
  });
}
