import { AlertTriangle, ArrowRight, BarChart3, Bot, Brain, Building2, Check, ChevronRight, Cpu, Database, FileText, Globe, Search, Shield, TrendingUp, Workflow, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { Section } from '@/features/landing/Section';

export async function generateMetadata(props: { params: { locale: string } }) {
  return {
    title: 'Ajax - AI-Powered Financial Workflow Builder | Automate Your Financial Processes',
    description: 'Transform complex financial processes into intelligent, automated workflows with Ajax. Multi-AI provider support, enterprise security, and intuitive chat-based interface for building sophisticated financial agentic workflows.',
    keywords: 'AI financial workflows, automated financial processes, AI agents, financial automation, workflow builder, fintech AI, financial AI platform',
    openGraph: {
      title: 'Ajax - AI-Powered Financial Workflow Builder',
      description: 'Transform complex financial processes into intelligent, automated workflows with Ajax.',
      images: ['/images/ajax-dashboard-screenshot.png'],
    },
  };
}

const IndexPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200/50 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/images/ajaxicon.svg"
                  alt="Ajax Icon"
                  width={36}
                  height={36}
                  className="size-9 drop-shadow-sm"
                />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#12243c] to-[#dab76d] opacity-20 blur"></div>
              </div>
              <Image
                src="/images/logotype.png"
                alt="Ajax"
                width={90}
                height={28}
                className="h-7 w-auto"
              />
            </div>
            <div className="hidden items-center space-x-10 md:flex">
              <Link href="#features" className="relative text-gray-700 transition-all duration-200 hover:text-[#12243c] hover:scale-105">
                <span className="relative">
                  Features
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#12243c] to-[#dab76d] transition-all duration-300 hover:w-full"></span>
                </span>
              </Link>
              <Link href="#workflows" className="relative text-gray-700 transition-all duration-200 hover:text-[#12243c] hover:scale-105">
                <span className="relative">
                  Workflows
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#12243c] to-[#dab76d] transition-all duration-300 hover:w-full"></span>
                </span>
              </Link>
              <Link href="#pricing" className="relative text-gray-700 transition-all duration-200 hover:text-[#12243c] hover:scale-105">
                <span className="relative">
                  Pricing
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#12243c] to-[#dab76d] transition-all duration-300 hover:w-full"></span>
                </span>
              </Link>
              <Link href="#security" className="relative text-gray-700 transition-all duration-200 hover:text-[#12243c] hover:scale-105">
                <span className="relative">
                  Security
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#12243c] to-[#dab76d] transition-all duration-300 hover:w-full"></span>
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href={`/${props.params.locale}/sign-in`}
                className="text-gray-700 transition-all duration-200 hover:text-[#12243c] font-medium"
              >
                Sign In
              </Link>
              <Link
                href={`/${props.params.locale}/sign-up`}
                className={buttonVariants({ 
                  size: 'sm',
                  className: 'bg-gradient-to-r from-[#12243c] to-[#dab76d] hover:from-[#0f1e32] hover:to-[#c9a658] shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105'
                })}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20 pb-24 pt-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[#12243c]/20 to-[#dab76d]/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-[#dab76d]/20 to-[#12243c]/10 blur-3xl"></div>
          <div className="absolute top-20 left-20 h-32 w-32 rounded-full bg-gradient-to-br from-[#dab76d]/10 to-[#12243c]/10 blur-2xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-10">
              <div className="animate-fadeInUp">
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#12243c]/10 to-[#dab76d]/20 px-6 py-3 text-sm font-semibold text-[#12243c] shadow-lg backdrop-blur-sm">
                  <Zap className="mr-3 size-5 animate-pulse" />
                  AI-Powered Financial Workflows
                  <div className="ml-3 size-2 animate-ping rounded-full bg-[#dab76d]"></div>
                </div>
              </div>

              <div className="animate-fadeInUp animation-delay-200">
                <h1 className="text-5xl font-extrabold leading-tight text-gray-900 md:text-7xl">
                  Transform
                  <span className="block bg-gradient-to-r from-[#12243c] via-[#dab76d] to-[#12243c] bg-clip-text text-transparent drop-shadow-sm">
                    Financial Processes
                  </span>
                  <span className="block text-4xl md:text-5xl font-bold text-gray-700">with Agentic AI</span>
                </h1>
              </div>

              <div className="animate-fadeInUp animation-delay-400">
                <p className="max-w-xl text-xl leading-relaxed text-gray-600 font-medium">
                  Build, deploy, and manage sophisticated financial agentic workflows with Ajax.
                  <span className="block mt-2 text-lg text-[#12243c] font-semibold">
                    Multi-AI provider support • Enterprise security • Intuitive interface
                  </span>
                </p>
              </div>

              <div className="animate-fadeInUp animation-delay-600">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                  <Link
                    href={`/${props.params.locale}/sign-up`}
                    className={buttonVariants({ 
                      size: 'lg', 
                      className: 'group bg-gradient-to-r from-[#12243c] to-[#dab76d] hover:from-[#0f1e32] hover:to-[#c9a658] shadow-2xl hover:shadow-[#dab76d]/25 transition-all duration-300 hover:scale-105 transform' 
                    })}
                  >
                    Start Building Workflows
                    <ArrowRight className="ml-3 size-5 transition-transform group-hover:translate-x-2" />
                  </Link>
                  
                  <div className="flex items-center space-x-4 flex-shrink-0">
                    <div className="flex -space-x-3">
                      <div className="size-10 rounded-full border-3 border-white bg-gradient-to-r from-[#12243c] to-[#12243c] shadow-lg"></div>
                      <div className="size-10 rounded-full border-3 border-white bg-gradient-to-r from-[#dab76d] to-[#dab76d] shadow-lg"></div>
                      <div className="size-10 rounded-full border-3 border-white bg-gradient-to-r from-[#12243c] to-[#dab76d] shadow-lg"></div>
                      <div className="size-10 rounded-full border-3 border-white bg-gradient-to-r from-[#dab76d] to-[#12243c] shadow-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">+</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <span className="block text-sm font-semibold text-gray-700 whitespace-nowrap">Trusted by</span>
                      <span className="block text-sm text-gray-500 whitespace-nowrap">financial teams worldwide</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-fadeInUp animation-delay-1000">
              {/* Main container with multiple background layers */}
              <div className="relative max-w-2xl mx-auto">
                {/* Background decorative elements */}
                <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-r from-[#12243c]/10 via-[#dab76d]/10 to-[#12243c]/10 blur-2xl"></div>
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#dab76d]/20 to-[#12243c]/20 blur-xl"></div>
                
                {/* Background frame layers - positioned absolutely to match main frame */}
                <div className="absolute inset-0 transform rotate-1 transition-transform duration-700 hover:rotate-0">
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-300/30 transform -rotate-2 scale-95 opacity-30 h-full">
                    <div className="w-full h-full bg-gradient-to-br from-[#12243c]/5 to-[#dab76d]/5"></div>
                  </div>
                </div>
                
                <div className="absolute inset-2 transform -rotate-1 transition-transform duration-700 hover:rotate-0">
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-200/50 transform rotate-1 scale-98 opacity-60 h-full">
                    <div className="w-full h-full bg-gradient-to-br from-[#dab76d]/8 to-[#12243c]/8"></div>
                  </div>
                </div>

                {/* Main screenshot frame */}
                <div className="relative z-10 transform transition-transform duration-700 hover:scale-105">
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl ring-2 ring-[#12243c]/20 backdrop-blur-sm">
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#12243c]/5 via-transparent to-[#dab76d]/5"></div>
                    
                    {/* Screenshot image container */}
                    <div className="relative p-3">
                      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-inner">
                        <Image
                          src="/images/ajax-dashboard-screenshot.png"
                          alt="Ajax Dashboard Interface"
                          width={800}
                          height={600}
                          className="w-full h-auto transition-transform duration-700 hover:scale-105"
                          priority
                        />
                      </div>
                    </div>
                    
                    {/* Overlay gradients for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/3 via-transparent to-white/5 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#12243c]/3 via-transparent to-[#dab76d]/3 pointer-events-none"></div>
                  </div>

                  {/* Floating elements around the screenshot */}
                  <div className="absolute -top-6 -right-6 size-12 rounded-full bg-gradient-to-r from-[#dab76d] to-[#12243c] shadow-lg animate-pulse opacity-80"></div>
                  <div className="absolute -bottom-4 -left-4 size-8 rounded-full bg-gradient-to-r from-[#12243c] to-[#dab76d] shadow-md animate-bounce opacity-60"></div>
                  {/* <div className="absolute top-1/4 -left-8 size-6 rounded-full bg-[#dab76d]/40 shadow-sm animate-ping"></div> */}
                  <div className="absolute bottom-1/3 -right-8 size-4 rounded-full bg-[#12243c]/40 shadow-sm animate-pulse"></div>
                </div>

                {/* Additional glow effects */}
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-transparent via-[#dab76d]/5 to-transparent blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* AI Providers Section */}
      <Section className="bg-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-amber-50/30"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-500">
              Powered by Leading AI Providers
            </h2>
            <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[#12243c] to-[#dab76d] rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 items-center justify-items-center gap-12 md:grid-cols-5">
            <div className="group flex items-center space-x-3 transition-all duration-300 hover:scale-110">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white group-hover:bg-gray-50 transition-colors shadow-md border border-gray-100">
                <Image
                  src="/providers/logos/openai-logo.svg"
                  alt="OpenAI"
                  width={28}
                  height={28}
                  className="size-7"
                />
              </div>
              <span className="text-lg font-bold text-gray-700 group-hover:text-green-600 transition-colors">OpenAI</span>
            </div>
            <div className="group flex items-center space-x-3 transition-all duration-300 hover:scale-110">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white group-hover:bg-gray-50 transition-colors shadow-md border border-gray-100">
                <Image
                  src="/providers/logos/anthropic-logo.svg"
                  alt="Anthropic"
                  width={28}
                  height={28}
                  className="size-7"
                />
              </div>
              <span className="text-lg font-bold text-gray-700 group-hover:text-orange-600 transition-colors">Anthropic</span>
            </div>
            <div className="group flex items-center space-x-3 transition-all duration-300 hover:scale-110">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white group-hover:bg-gray-50 transition-colors shadow-md border border-gray-100">
                <Image
                  src="/providers/logos/google-ai-logo.svg"
                  alt="Google AI"
                  width={28}
                  height={28}
                  className="size-7"
                />
              </div>
              <span className="text-lg font-bold text-gray-700 group-hover:text-[#12243c] transition-colors">Google AI</span>
            </div>
            <div className="group flex items-center space-x-3 transition-all duration-300 hover:scale-110">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white group-hover:bg-gray-50 transition-colors shadow-md border border-gray-100">
                <Image
                  src="/providers/logos/azure-logo.svg"
                  alt="Azure AI"
                  width={28}
                  height={28}
                  className="size-7"
                />
              </div>
              <span className="text-lg font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">Azure AI</span>
            </div>
            <div className="group flex items-center space-x-3 transition-all duration-300 hover:scale-110">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white group-hover:bg-gray-50 transition-colors shadow-md border border-gray-100">
                <Image
                  src="/providers/logos/ollama-logo.svg"
                  alt="Ollama"
                  width={28}
                  height={28}
                  className="size-7"
                />
              </div>
              <span className="text-lg font-bold text-gray-700 group-hover:text-[#dab76d] transition-colors">Ollama</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <div id="features">
        <Section className="bg-gradient-to-br from-gray-50 to-white py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#12243c]/10 to-[#dab76d]/10 blur-3xl"></div>
            <div className="absolute bottom-20 left-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#dab76d]/10 to-[#12243c]/10 blur-3xl"></div>
          </div>
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-20 text-center">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#12243c]/10 to-[#dab76d]/20 px-6 py-3 text-sm font-semibold text-[#12243c] mb-6">
                <Shield className="mr-2 size-4" />
                Enterprise-Grade Platform
              </div>
              <h2 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
                Everything you need to build
                <span className="block bg-gradient-to-r from-[#12243c] to-[#dab76d] bg-clip-text text-transparent">
                  intelligent financial workflows
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600 leading-relaxed">
                Comprehensive AI platform designed for financial professionals who demand excellence
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl bg-white p-10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-[#12243c]/5 to-[#dab76d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="mb-8 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#12243c] to-[#dab76d] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Bot className="size-8 text-white" />
                  </div>
                  <h3 className="mb-6 text-2xl font-bold text-gray-900 group-hover:text-[#12243c] transition-colors">Multi-AI Provider Support</h3>
                  <p className="mb-8 text-gray-600 leading-relaxed text-lg">
                    Leverage OpenAI GPT, Anthropic Claude, Google Gemini, Azure OpenAI, and Ollama models for comprehensive AI capabilities.
                  </p>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-center">
                      <div className="mr-4 flex size-6 items-center justify-center rounded-full bg-[#dab76d]/20">
                        <Check className="size-4 text-[#12243c]" />
                      </div>
                      Advanced language understanding
                    </li>
                    <li className="flex items-center">
                      <div className="mr-4 flex size-6 items-center justify-center rounded-full bg-[#dab76d]/20">
                        <Check className="size-4 text-[#12243c]" />
                      </div>
                      Multimodal processing
                    </li>
                    <li className="flex items-center">
                      <div className="mr-4 flex size-6 items-center justify-center rounded-full bg-[#dab76d]/20">
                        <Check className="size-4 text-[#12243c]" />
                      </div>
                      Local model deployment
                    </li>
                  </ul>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white p-10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-[#dab76d]/5 to-[#12243c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="mb-8 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dab76d] to-[#12243c] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Workflow className="size-8 text-white" />
                  </div>
                  <h3 className="mb-6 text-2xl font-bold text-gray-900 group-hover:text-[#dab76d] transition-colors">Intelligent Agent System</h3>
                  <p className="mb-8 text-gray-600 leading-relaxed text-lg">
                    Dynamic inquiry system with context-aware follow-ups, web search integration, and visual workflow builder.
                  </p>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-center">
                      <div className="mr-4 flex size-6 items-center justify-center rounded-full bg-[#12243c]/20">
                        <Check className="size-4 text-[#dab76d]" />
                      </div>
                      Canvas workflow designer
                    </li>
                    <li className="flex items-center">
                      <div className="mr-4 flex size-6 items-center justify-center rounded-full bg-[#12243c]/20">
                        <Check className="size-4 text-[#dab76d]" />
                      </div>
                      Real-time data retrieval
                    </li>
                    <li className="flex items-center">
                      <div className="mr-4 flex size-6 items-center justify-center rounded-full bg-[#12243c]/20">
                        <Check className="size-4 text-[#dab76d]" />
                      </div>
                      Streaming AI responses
                    </li>
                  </ul>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white p-10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-[#12243c]/5 to-[#dab76d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="mb-8 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#12243c] to-[#dab76d] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="size-8 text-white" />
                  </div>
                  <h3 className="mb-6 text-2xl font-bold text-gray-900 group-hover:text-[#12243c] transition-colors">Enterprise Security</h3>
                  <p className="mb-8 text-gray-600 leading-relaxed text-lg">
                    Bank-grade security with Clerk authentication, Redis session management, and comprehensive monitoring.
                  </p>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-center">
                      <div className="mr-4 flex size-6 items-center justify-center rounded-full bg-[#dab76d]/20">
                        <Check className="size-4 text-[#12243c]" />
                      </div>
                      SOC 2 Type II compliant
                    </li>
                    <li className="flex items-center">
                      <div className="mr-4 flex size-6 items-center justify-center rounded-full bg-[#dab76d]/20">
                        <Check className="size-4 text-[#12243c]" />
                      </div>
                      End-to-end encryption
                    </li>
                    <li className="flex items-center">
                      <div className="mr-4 flex size-6 items-center justify-center rounded-full bg-[#dab76d]/20">
                        <Check className="size-4 text-[#12243c]" />
                      </div>
                      Real-time monitoring
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Financial Workflows Section */}
      <div id="workflows">
        <Section className="bg-white py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-amber-50/30 to-slate-50/30"></div>
            <div className="absolute top-40 right-40 h-32 w-32 rounded-full bg-gradient-to-br from-[#12243c]/20 to-[#dab76d]/20 blur-2xl"></div>
            <div className="absolute bottom-40 left-40 h-32 w-32 rounded-full bg-gradient-to-br from-[#dab76d]/20 to-[#12243c]/20 blur-2xl"></div>
          </div>
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-20 text-center">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#dab76d]/20 to-[#12243c]/10 px-6 py-3 text-sm font-semibold text-[#12243c] mb-6">
                <Workflow className="mr-2 size-4" />
                Pre-built Templates
              </div>
              <h2 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
                Jump-start your
                <span className="block bg-gradient-to-r from-[#dab76d] to-[#12243c] bg-clip-text text-transparent">
                  financial automation
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600 leading-relaxed">
                Expertly crafted workflow templates designed for modern financial operations
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl border-2 border-[#12243c]/20 bg-gradient-to-br from-[#12243c]/5 to-slate-50 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-[#12243c]/40">
                <div className="absolute inset-0 bg-gradient-to-br from-[#12243c]/5 to-slate-50/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#12243c] to-[#dab76d] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="size-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 group-hover:text-[#12243c] transition-colors">Credit Risk Analysis</h3>
                  <p className="mb-6 text-gray-600 leading-relaxed">
                    Automated risk assessment and scoring with configurable thresholds and decision trees.
                  </p>
                  <Link href="#" className="inline-flex items-center font-semibold text-[#12243c] hover:text-[#dab76d] group-hover:translate-x-2 transition-all duration-300">
                    Learn more
                    <ChevronRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border-2 border-[#dab76d]/30 bg-gradient-to-br from-[#dab76d]/10 to-amber-50 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-[#dab76d]/50">
                <div className="absolute inset-0 bg-gradient-to-br from-[#dab76d]/5 to-amber-50/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dab76d] to-[#12243c] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="size-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 group-hover:text-[#dab76d] transition-colors">Investment Management</h3>
                  <p className="mb-6 text-gray-600 leading-relaxed">
                    Portfolio optimization, rebalancing, and performance analytics with real-time market data.
                  </p>
                  <Link href="#" className="inline-flex items-center font-semibold text-[#dab76d] hover:text-[#12243c] group-hover:translate-x-2 transition-all duration-300">
                    Learn more
                    <ChevronRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border-2 border-[#12243c]/20 bg-gradient-to-br from-[#12243c]/5 to-slate-50 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-[#12243c]/40">
                <div className="absolute inset-0 bg-gradient-to-br from-[#12243c]/5 to-slate-50/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#12243c] to-[#dab76d] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Search className="size-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 group-hover:text-[#12243c] transition-colors">Stock Research</h3>
                  <p className="mb-6 text-gray-600 leading-relaxed">
                    Comprehensive market analysis, company research, and investment insights generation.
                  </p>
                  <Link href="#" className="inline-flex items-center font-semibold text-[#12243c] hover:text-[#dab76d] group-hover:translate-x-2 transition-all duration-300">
                    Learn more
                    <ChevronRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border-2 border-[#dab76d]/30 bg-gradient-to-br from-[#dab76d]/10 to-amber-50 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-[#dab76d]/50">
                <div className="absolute inset-0 bg-gradient-to-br from-[#dab76d]/5 to-amber-50/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dab76d] to-[#12243c] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <AlertTriangle className="size-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 group-hover:text-[#dab76d] transition-colors">Fraud Detection</h3>
                  <p className="mb-6 text-gray-600 leading-relaxed">
                    Real-time transaction monitoring with pattern recognition and anomaly detection.
                  </p>
                  <Link href="#" className="inline-flex items-center font-semibold text-[#dab76d] hover:text-[#12243c] group-hover:translate-x-2 transition-all duration-300">
                    Learn more
                    <ChevronRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border-2 border-[#12243c]/20 bg-gradient-to-br from-[#12243c]/5 to-slate-50 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-[#12243c]/40">
                <div className="absolute inset-0 bg-gradient-to-br from-[#12243c]/5 to-slate-50/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#12243c] to-[#dab76d] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FileText className="size-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 group-hover:text-[#12243c] transition-colors">KYC Verification</h3>
                  <p className="mb-6 text-gray-600 leading-relaxed">
                    Automated compliance workflows with document validation and identity verification.
                  </p>
                  <Link href="#" className="inline-flex items-center font-semibold text-[#12243c] hover:text-[#dab76d] group-hover:translate-x-2 transition-all duration-300">
                    Learn more
                    <ChevronRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border-2 border-[#dab76d]/30 bg-gradient-to-br from-[#dab76d]/10 to-amber-50 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-[#dab76d]/50">
                <div className="absolute inset-0 bg-gradient-to-br from-[#dab76d]/5 to-amber-50/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dab76d] to-[#12243c] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="size-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 group-hover:text-[#dab76d] transition-colors">Business Intelligence</h3>
                  <p className="mb-6 text-gray-600 leading-relaxed">
                    Data-driven financial reporting with automated insights and trend analysis.
                  </p>
                  <Link href="#" className="inline-flex items-center font-semibold text-[#dab76d] hover:text-[#12243c] group-hover:translate-x-2 transition-all duration-300">
                    Learn more
                    <ChevronRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* CTA Section */}
      <Section className="relative overflow-hidden bg-gradient-to-r from-[#12243c] via-[#1a2c45] to-[#12243c] py-24">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#dab76d]/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#dab76d]/20 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center rounded-full bg-[#dab76d]/20 px-6 py-3 text-sm font-semibold text-[#dab76d] mb-8 backdrop-blur-sm">
            <Zap className="mr-2 size-4 animate-pulse" />
            Join the AI Revolution
          </div>
          <h2 className="mb-8 text-4xl font-extrabold text-white md:text-5xl">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-[#dab76d] to-yellow-300 bg-clip-text text-transparent">
              Financial Workflows?
            </span>
          </h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-blue-100 leading-relaxed">
            Join financial professionals who trust Ajax to automate their most complex processes.
            <span className="block mt-2 text-lg font-semibold text-white">Start your free trial today—no credit card required.</span>
            </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link
              href={`/${props.params.locale}/sign-up`}
              className={buttonVariants({
                variant: 'secondary',
                size: 'lg',
                className: 'group bg-white text-[#12243c] hover:bg-gray-50 shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 font-semibold px-8 py-4',
              })}
            >
              Start Free Trial
              <ArrowRight className="ml-3 size-5 transition-transform group-hover:translate-x-2" />
            </Link>
            <Link
              href="https://calendly.com/raminfazli/freecall"
              target="_blank"
              className={buttonVariants({
                variant: 'outline',
                size: 'lg',
                className: 'group bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#12243c] transition-all duration-300 hover:scale-105 font-semibold px-8 py-4',
              })}
            >
              <div className="flex items-center">
                <div className="mr-3 size-3 animate-pulse rounded-full bg-[#dab76d]"></div>
                Request Consultation
              </div>
            </Link>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/ajaxicon.svg"
                  alt="Ajax Icon"
                  width={32}
                  height={32}
                  className="size-8 invert"
                />
                <Image
                  src="/images/logotype.png"
                  alt="Ajax"
                  width={80}
                  height={24}
                  className="h-6 w-auto invert"
                />
              </div>
              <p className="max-w-sm text-gray-400">
                AI-powered financial workflow automation platform for modern enterprises.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="transition-colors hover:text-white">Features</Link></li>
                <li><Link href="#workflows" className="transition-colors hover:text-white">Workflows</Link></li>
                <li><Link href="#pricing" className="transition-colors hover:text-white">Pricing</Link></li>
                <li><Link href="#security" className="transition-colors hover:text-white">Security</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#about" className="transition-colors hover:text-white">About</Link></li>
                <li><Link href="#blog" className="transition-colors hover:text-white">Blog</Link></li>
                <li><Link href="#careers" className="transition-colors hover:text-white">Careers</Link></li>
                <li><Link href="#contact" className="transition-colors hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#privacy" className="transition-colors hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#terms" className="transition-colors hover:text-white">Terms of Service</Link></li>
                <li><Link href="#security" className="transition-colors hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
            <p className="text-sm text-gray-400">
              © 2024 Ajax AI. All rights reserved.
            </p>
            <div className="mt-4 flex items-center space-x-6 md:mt-0">
              <Link href="/status" className="text-sm text-gray-400 transition-colors hover:text-white">
                System Status
              </Link>
              <div className="flex items-center space-x-2">
                <div className="size-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-400">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default IndexPage;
