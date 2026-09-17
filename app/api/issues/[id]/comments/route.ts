import { NextResponse } from 'next/server';
import { mockIssues } from '@/lib/mockData';

export async function POST(
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
  
  const newComment = {
    id: `c${issue.comments.length + 1}`,
    author: body.author,
    content: body.content,
    createdAt: new Date(),
    isLandlord: body.isLandlord || false,
  };
  
  return NextResponse.json({
    message: 'Comment added successfully',
    comment: newComment,
  }, { status: 201 });
}
