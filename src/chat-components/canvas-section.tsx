'use client'

import { Section } from './section'
import { useRef } from 'react'
import { Expand } from 'lucide-react'

export type AnswerSectionProps = {
  hasHeader?: boolean
  agentServerUrl: string
  TemplateID: string
}

export function CanvasSection({
  agentServerUrl,
  TemplateID,
  hasHeader = true
}: AnswerSectionProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  function handleExpand() {
    iframeRef.current?.requestFullscreen?.()
  }

  return (
    <div style={{ position: 'relative' }}>
      <Section title={hasHeader ? 'Agentic AI Workflow' : undefined}>
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '16px', 
            left: '8px',
            padding: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            const icon = e.currentTarget.firstChild as HTMLElement;
            if (icon) icon.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0)';
            const icon = e.currentTarget.firstChild as HTMLElement;
            if (icon) icon.style.opacity = '0.7';
          }}
        >
          <Expand 
            size={36} 
            onClick={handleExpand}
            style={{ opacity: 0.7 }}
          />
        </div>
        <iframe
          ref={iframeRef}
          src={`${agentServerUrl}/generate/${TemplateID}`}
          width="100%"
          height="500px"
          allowFullScreen
          style={{ borderRadius: '8px', border: '1px solid gray' }}
        />
      </Section>
    </div>
  )
}
