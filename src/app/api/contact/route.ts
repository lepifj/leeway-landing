import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Here you would typically integrate with your email service
    // For example, using nodemailer, SendGrid, or other email services
    // For now, we'll just log the data and return success
    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
