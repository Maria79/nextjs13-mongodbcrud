import connectMongoDB from '@/libs/mongodb';
import Topic from '@/models/topic';
import { NextRequest } from 'next/server';

export async function PUT(request, { params }) {
	const { id } = params;
	const { newTitle: title, newDescription: description } = await request.json();
	await connectMongoDB();
	await Topic.findByIdAndUpdate(id, { title, description });

	return NextRequest.json({ message: 'Topic updated' }, { status: 200 });
}

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();

	const topic = await Topic.findOne({ _id: id });

	return NextRequest.json({ topic }, { status: 200 });
}
