import { ArrowLeft } from 'phosphor-react';
import React, { FormEvent, useState } from 'react';
import { FeedbackType, feedbackTypes } from '..';
import { api } from '../../../service';
import CloseButton from '../../CloseButton';
import Loading from '../../Loading';
import ScreenshotButton from '../ScreenshotButton';

interface FeedbackContentStepProps {
  feedbacktype: FeedbackType;
  onFeedbackRestartRequest: () => void;
  onFeedbackSend: () => void;
}

export default function FeedbackContentStep({ feedbacktype, onFeedbackRestartRequest, onFeedbackSend }: FeedbackContentStepProps) {
  const feedbackTypeInfo = feedbackTypes[feedbacktype]
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSedingFeedback, setIsSedingFeedback] = useState(false);

  async function handleSubmitFeedback(e: FormEvent) {
    e.preventDefault()
    setIsSedingFeedback(true)
    await api.post('feedbacks', {
      type: feedbacktype,
      comment: comment,
      screenshot: screenshot
    })
    setIsSedingFeedback(false)
    onFeedbackSend()
  }


  return (
    <>
      <header>
        <button type='button' className='top-5 left-5 absolute text-zinc-400 hover:text-zinc-100' onClick={onFeedbackRestartRequest}>
          <ArrowLeft weight='bold' className='w-4 h-4' />
        </button>
        <span className='text-xl leading-6 flex items-center gap-2'>
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt}
            className='w-6 h-6' />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form className='my-4 w-full' onSubmit={(e) => handleSubmitFeedback(e)}>
        <textarea
          className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
          placeholder='Conte com detalhes o que está acontecendo...'
          onChange={(e) => setComment(e.target.value)}
        />
        <footer className='flex gap-2 mt-2'>
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot} />
          <button
            disabled={comment.length === 0 || isSedingFeedback}
            type='submit'
            className='p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500'>
            {isSedingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}
