import type { HttpContext } from '@adonisjs/core/http';
import Subject from '../models/subject.js';
import Topic from '../models/topic.js';
import Question from '../models/question.js';
import Sign from '../models/sign.js';

export default class SubjectsController {
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'level_id',
        'title',
        'description',
        'theory_content',
        'practice_signs',
        'video_url',
        'questions',
        'curiosities'
      ]);

      // ---- 1️⃣ Cria o Subject (tema) ----
      const subject = await Subject.create({
        level_id: data.level_id,
        title: data.title,
        description: data.description
      });

      // ---- 2️⃣ Tópico theory ----
      await Topic.create({
        subject_id: subject.id,
        title: 'Aula Teórica',
        type: 'theory',
        content: data.theory_content
      });

      // ---- 3️⃣ Cria sinais do practice ----
      const signsNames: string[] = data.practice_signs
        .split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s);

      for (const name of signsNames) {
        await Sign.firstOrCreate(
          { name },
          { name, description: '', video_url: '' }
        );
      }

      // ---- 4️⃣ Tópico practice ----
      await Topic.create({
        subject_id: subject.id,
        title: 'Prática de sinais',
        type: 'practice',
        content: JSON.stringify(signsNames)
      });

      // ---- 5️⃣ Tópico test ----
      const testTopic = await Topic.create({
        subject_id: subject.id,
        title: 'Questionário',
        type: 'test'
      });

      // ---- 6️⃣ Cria questões do test ----
      const questions = data.questions || [];
      for (const q of questions) {
        await Question.create({
          topic_id: testTopic.id,
          question_text: q.question_text,
          options: JSON.stringify(q.options),
          correct_answer: q.correct_answer,
        explanation: q.explanation || ''

        });
      }

      // ---- 7️⃣ Tópico curiosidade ----
      await Topic.create({
        subject_id: subject.id,
        title: 'Curiosidades',
        type: 'curiosity',
        content: JSON.stringify((data.curiosities || '').split(',').slice(0, 3))
      });

      // ---- 8️⃣ Tópico demonstração ----
      await Topic.create({
        subject_id: subject.id,
        title: 'Demonstração',
        type: 'demonstration',
        video_url: data.video_url
      });

      return response.status(201).send({
        message: 'Tema cadastrado com sucesso!',
        subjectId: subject.id
      });

    } catch (error) {
      console.error(error);
      return response.status(500).send({ message: 'Erro ao cadastrar o tema' });
    }
  }
}
