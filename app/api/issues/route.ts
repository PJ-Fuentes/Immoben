import { NextResponse } from 'next/server';
import { mockIssues } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({
    issues: mockIssues,
    total: mockIssues.length,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  return NextResponse.json({
    message: 'Issue created successfully',
    issue: {
      id: String(mockIssues.length + 1),
      ...body,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
    },
  }, { status: 201 });
}
