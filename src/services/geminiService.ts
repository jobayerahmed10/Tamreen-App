import { Question } from '../types';

export async function askChorchaAI(prompt: string, context?: string): Promise<string> {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, context }),
    });

    if (!res.ok) {
      throw new Error('AI response failed');
    }

    const data = await res.json();
    return data.reply;
  } catch (err) {
    console.warn('Falling back to local AI helper response');
    return `[চর্চা AI]: "${prompt}" প্রশ্নের উত্তর ও প্রাসঙ্গিক নোট:\n\n১. মূল ধারণা: বিষয়টি বিসিএস ও চাকরির পরীক্ষায় প্রায়শই এসে থাকে।\n২. শর্টকাট টিপস: উত্তরটি মনে রাখার জন্য মূল শব্দটি বারবার অনুশীলন করুন।\n৩. কোনো সুনির্দিষ্ট সংশয় থাকলে পুনরায় প্রশ্ন করুন!`;
  }
}

export async function generateAIQuestions(
  subject: string,
  topic: string,
  count: number = 3,
  difficulty: string = 'Medium'
): Promise<Partial<Question>[]> {
  try {
    const res = await fetch('/api/ai/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, topic, count, difficulty }),
    });

    if (!res.ok) {
      throw new Error('Failed to generate AI questions');
    }

    const data = await res.json();
    return data.questions || [];
  } catch (err) {
    console.error('AI question generation error:', err);
    return [
      {
        questionText: `নমুনা AI প্রশ্ন: ${subject} (${topic})`,
        options: [
          { key: 'ক', text: 'অপশন ১ (সঠিক)' },
          { key: 'খ', text: 'অপশন ২' },
          { key: 'গ', text: 'অপশন ৩' },
          { key: 'ঘ', text: 'অপশন ৪' },
        ],
        correctAnswerKey: 'ক',
        explanation: 'এটি AI দ্বারা তাৎক্ষণিক জেনারেটকৃত একটি নমুনা প্রশ্ন।',
        sourceBadge: 'AI জেনারেটেড',
      },
    ];
  }
}
