import React from 'react'
import { Button } from '@/chat-components/ui/button'
import { ExternalLink, ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: 'Create a loan approval workflow with risk assessment',
    message: 'Design an automated workflow for loan approval that includes credit scoring, income verification, and risk assessment using AI agents'
  },
  {
    heading: 'Set up real-time fraud detection pipeline',
    message: 'Create a multi-stage fraud detection system that monitors transactions, analyzes patterns, and triggers alerts for suspicious activities'
  },
  {
    heading: 'Build an automated portfolio rebalancing system',
    message: 'Develop a workflow for automated portfolio rebalancing based on risk tolerance, market conditions, and asset allocation targets'
  },
  {
    heading: 'Design KYC verification process',
    message: 'Create an automated Know Your Customer (KYC) verification workflow with document validation and compliance checks'
  },
  {
    heading: 'Set up an  credit risk monitoring system',
    message: 'Set up an ongoing credit risk monitoring system that tracks customer creditworthiness and provides early warning signals'
  }
]

export const EmptyScreen = React.forwardRef<HTMLDivElement, {
  submitMessage: (message: string) => void
  className?: string
}>(({ submitMessage, className }, ref) => {
  return (
    <div ref={ref} className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ExternalLink size={20} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
})

EmptyScreen.displayName = "EmptyScreen";
