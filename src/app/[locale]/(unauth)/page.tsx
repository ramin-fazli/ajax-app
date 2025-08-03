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
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/ajaxicon.svg"
                alt="Ajax Icon"
                width={32}
                height={32}
                className="size-8"
              />
              <Image
                src="/images/logotype.png"
                alt="Ajax"
                width={80}
                height={24}
                className="h-6 w-auto"
              />
            </div>
            <div className="hidden items-center space-x-8 md:flex">
              <Link href="#features" className="text-gray-600 transition-colors hover:text-gray-900">
                Features
              </Link>
              <Link href="#workflows" className="text-gray-600 transition-colors hover:text-gray-900">
                Workflows
              </Link>
              <Link href="#pricing" className="text-gray-600 transition-colors hover:text-gray-900">
                Pricing
              </Link>
              <Link href="#security" className="text-gray-600 transition-colors hover:text-gray-900">
                Security
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href={`/${props.params.locale}/sign-in`}
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link
                href={`/${props.params.locale}/sign-up`}
                className={buttonVariants({ size: 'sm' })}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-20 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                <Zap className="mr-2 size-4" />
                AI-Powered Financial Workflows
              </div>

              <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                Transform Financial
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Processes with AI
                </span>
              </h1>

              <p className="max-w-lg text-xl leading-relaxed text-gray-600">
                Build, deploy, and manage sophisticated financial agentic workflows with Ajax.
                Multi-AI provider support, enterprise security, and intuitive chat-based interface.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/${props.params.locale}/sign-up`}
                  className={buttonVariants({ size: 'lg', className: 'group' })}
                >
                  Start Building Workflows
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#demo"
                  className={buttonVariants({ variant: 'outline', size: 'lg' })}
                >
                  View Demo
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="size-8 rounded-full border-2 border-white bg-blue-500"></div>
                    <div className="size-8 rounded-full border-2 border-white bg-purple-500"></div>
                    <div className="size-8 rounded-full border-2 border-white bg-indigo-500"></div>
                  </div>
                  <span className="text-sm text-gray-600">Trusted by 1000+ financial teams</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
                <Image
                  src="/images/ajax-dashboard-screenshot.png"
                  alt="Ajax Dashboard Interface"
                  width={800}
                  height={600}
                  className="h-auto w-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Floating elements */}
              <div className="absolute -right-4 -top-4 flex items-center space-x-2 rounded-lg bg-white p-4 shadow-lg">
                <div className="size-3 animate-pulse rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Live AI Processing</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* AI Providers Section */}
      <Section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Powered by Leading AI Providers
            </h2>
          </div>
          <div className="grid grid-cols-2 items-center justify-items-center gap-8 opacity-60 md:grid-cols-5">
            <div className="flex items-center space-x-2">
              <Brain className="size-8 text-green-600" />
              <span className="text-lg font-semibold">OpenAI</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bot className="size-8 text-orange-600" />
              <span className="text-lg font-semibold">Anthropic</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cpu className="size-8 text-blue-600" />
              <span className="text-lg font-semibold">Google AI</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="size-8 text-indigo-600" />
              <span className="text-lg font-semibold">Azure AI</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="size-8 text-purple-600" />
              <span className="text-lg font-semibold">Ollama</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <div id="features">
        <Section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Enterprise-Grade AI Financial Platform
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                Everything you need to build, deploy, and scale intelligent financial workflows
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-blue-100">
                  <Bot className="size-6 text-blue-600" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">Multi-AI Provider Support</h3>
                <p className="mb-6 text-gray-600">
                  Leverage OpenAI GPT, Anthropic Claude, Google Gemini, Azure OpenAI, and Ollama models for comprehensive AI capabilities.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="mr-2 size-4 shrink-0 text-green-500" />
                    Advanced language understanding
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 size-4 shrink-0 text-green-500" />
                    Multimodal processing
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 size-4 shrink-0 text-green-500" />
                    Local model deployment
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-purple-100">
                  <Workflow className="size-6 text-purple-600" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">Intelligent Agent System</h3>
                <p className="mb-6 text-gray-600">
                  Dynamic inquiry system with context-aware follow-ups, web search integration, and visual workflow builder.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="mr-2 size-4 shrink-0 text-green-500" />
                    Canvas workflow designer
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 size-4 shrink-0 text-green-500" />
                    Real-time data retrieval
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 size-4 shrink-0 text-green-500" />
                    Streaming AI responses
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-green-100">
                  <Shield className="size-6 text-green-600" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">Enterprise Security</h3>
                <p className="mb-6 text-gray-600">
                  Bank-grade security with Clerk authentication, Redis session management, and comprehensive monitoring.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="mr-2 size-4 shrink-0 text-green-500" />
                    SOC 2 Type II compliant
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 size-4 shrink-0 text-green-500" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 size-4 shrink-0 text-green-500" />
                    Real-time monitoring
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Financial Workflows Section */}
      <div id="workflows">
        <Section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Pre-built Financial Workflow Templates
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                Jump-start your financial automation with our expertly crafted workflow templates
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 transition-all duration-300 hover:shadow-lg">
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-blue-500">
                  <TrendingUp className="size-6 text-white" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">Credit Risk Analysis</h3>
                <p className="mb-6 text-gray-600">
                  Automated risk assessment and scoring with configurable thresholds and decision trees.
                </p>
                <Link href="#" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-700">
                  Learn more
                  <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="group rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-8 transition-all duration-300 hover:shadow-lg">
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-purple-500">
                  <BarChart3 className="size-6 text-white" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">Investment Management</h3>
                <p className="mb-6 text-gray-600">
                  Portfolio optimization, rebalancing, and performance analytics with real-time market data.
                </p>
                <Link href="#" className="inline-flex items-center font-medium text-purple-600 hover:text-purple-700">
                  Learn more
                  <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="group rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-8 transition-all duration-300 hover:shadow-lg">
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-green-500">
                  <Search className="size-6 text-white" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">Stock Research</h3>
                <p className="mb-6 text-gray-600">
                  Comprehensive market analysis, company research, and investment insights generation.
                </p>
                <Link href="#" className="inline-flex items-center font-medium text-green-600 hover:text-green-700">
                  Learn more
                  <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="group rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-red-50 p-8 transition-all duration-300 hover:shadow-lg">
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-orange-500">
                  <AlertTriangle className="size-6 text-white" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">Fraud Detection</h3>
                <p className="mb-6 text-gray-600">
                  Real-time transaction monitoring with pattern recognition and anomaly detection.
                </p>
                <Link href="#" className="inline-flex items-center font-medium text-orange-600 hover:text-orange-700">
                  Learn more
                  <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="group rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-8 transition-all duration-300 hover:shadow-lg">
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-indigo-500">
                  <FileText className="size-6 text-white" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">KYC Verification</h3>
                <p className="mb-6 text-gray-600">
                  Automated compliance workflows with document validation and identity verification.
                </p>
                <Link href="#" className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-700">
                  Learn more
                  <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="group rounded-xl border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-8 transition-all duration-300 hover:shadow-lg">
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-teal-500">
                  <Building2 className="size-6 text-white" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">Business Intelligence</h3>
                <p className="mb-6 text-gray-600">
                  Data-driven financial reporting with automated insights and trend analysis.
                </p>
                <Link href="#" className="inline-flex items-center font-medium text-teal-600 hover:text-teal-700">
                  Learn more
                  <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Ready to Transform Your Financial Workflows?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
            Join thousands of financial professionals who trust Ajax to automate their most complex processes.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`/${props.params.locale}/sign-up`}
              className={buttonVariants({
                variant: 'secondary',
                size: 'lg',
                className: 'group bg-white text-blue-600 hover:bg-gray-50',
              })}
            >
              Start Free Trial
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#demo"
              className={buttonVariants({
                variant: 'outline',
                size: 'lg',
                className: 'group bg-white text-blue-600 hover:bg-gray-50',
              })}
            >
              Schedule Demo
            </Link>
          </div>
          <p className="mt-6 text-sm text-blue-200">
            No credit card required
          </p>
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
