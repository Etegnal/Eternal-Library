import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import TestRunnerClientView from '@/components/TestRunnerClientView';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: {
    slug: string;
  };
}

export default async function PsychologicalTestDetailPage({ params }: Props) {
  const { slug } = params;

  let test: any = null;
  try {
    test = await prisma.psychologicalTest.findUnique({
      where: { slug },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: {
            options: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching test for detail page:', error);
  }

  if (!test) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-[#1C0E07] text-amber-100 flex flex-col font-sans">
      <main className="flex-grow pt-28 sm:pt-36 pb-16 px-4 sm:px-8 w-full">
        <TestRunnerClientView test={test} />
      </main>
    </div>
  );
}
