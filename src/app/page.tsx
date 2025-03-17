"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CheckCircle, BarChart2, Clock, Users, Star, ArrowRight, Github, Twitter, Linkedin, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logo from "@/app/imgs/Bare Organics.zip - 1 2.svg"
import fondo from "@/app/imgs/fondo.jpg"
import { useState } from "react"


export default function Home() {
  const [activeSection, setActiveSection] = useState("");

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky flex top-0 z-50 w-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 justify-between">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-2 my-2">
            <Image
              src={logo}
              alt="Tercer tiempo Logo"
              width={70}
              height={70}
              className="rounded"
            />
            <span className="text-xl font-bold">Tercer tiempo Ubaté</span>
          </div>

          <nav className="hidden md:flex gap-6 justify-self-end">
            <Link 
              href="#features" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "features" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={() => handleNavClick("features")}
            >
              ¿Quiénes somos?
            </Link>
            <Link 
              href="#services" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "services" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={() => handleNavClick("services")}
            >
              Nuestros servicios
            </Link>
            <Link 
              href="#testimonials" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "testimonials" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={() => handleNavClick("testimonials")}
            >
              Opiniones
            </Link>
            <Link 
              href="#features2" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "features2" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={() => handleNavClick("features2")}
            >
              Características
            </Link>
            <Link 
              href="#contact" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "contact" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={() => handleNavClick("contact")}
            >
              Contactanos
            </Link>
          </nav>

          <div className="flex items-center gap-4 width-auto md:width-0 lg:width-0 xl:width-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                <Link 
                  href="#features" 
                  className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "features" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
                  onClick={() => handleNavClick("features")}
                >
                  ¿Quiénes somos?
                </Link>
                <Link 
                  href="#services" 
                  className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "services" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
                  onClick={() => handleNavClick("services")}
                >
                  Nuestros servicios
                </Link>
                <Link 
                  href="#testimonials" 
                  className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "testimonials" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
                  onClick={() => handleNavClick("testimonials")}
                >
                  Opiniones
                </Link>
                <Link 
                  href="#features2" 
                  className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "features2" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
                  onClick={() => handleNavClick("features2")}
                >
                  Características
                </Link>
                <Link 
                  href="#contact" 
                  className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "contact" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
                  onClick={() => handleNavClick("contact")}
                >
                  Contactanos
                </Link>
                  <Button size="sm" className="mt-4">
                    Get Started
                  </Button>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Log in
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[2px]"
            style={{ 
              backgroundImage: `url(${fondo.src})`,
                // Adjust transparency here (0.0 to 1.0)
            }}
          ></div>
          
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Content */}
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2 bg-white/80 backdrop-blur-sm p-6 rounded-lg">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-center py-2">
                    Tercer tiempo
                  </h1>
                  <p className="text-muted-foreground md:text-xl text-center">
                    La cancha sintética todo en 1 en Ubaté. Ven y disfruta de un espacio único para compartir con tus amigos y familiares.
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 min-[400px]:flex-row items-center justify-center">
                  <Button size="lg" className="gap-1">
                    Reserva ya
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white/90">
                    Contáctanos
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="default" className="px-3 py-1">
                  Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to manage your projects
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our platform provides all the tools you need to keep your team organized, focused, and productive.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
              <div className="grid gap-6">
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">Advanced Analytics</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">
                      Get detailed insights into your team's performance and project progress with our powerful
                      analytics tools.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">Time Tracking</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">
                      Track time spent on tasks and projects to improve productivity and billing accuracy.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">Team Collaboration</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">
                      Work together seamlessly with real-time updates, comments, and file sharing capabilities.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">Task Management</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">
                      Create, assign, and track tasks with ease. Set priorities, deadlines, and dependencies.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  alt="Features illustration"
                  width={550}
                  height={550}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="default" className="px-3 py-1">
                  Testimonials
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Loved by teams worldwide</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Don't just take our word for it. Here's what our customers have to say.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      "StreamLine has completely transformed how our team works together. The interface is intuitive and
                      the features are exactly what we needed."
                    </p>
                  </div>
                  <div className="mt-6 flex items-center space-x-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Sarah Johnson"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Product Manager, TechCorp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      "We've tried many project management tools, but StreamLine is by far the best. It's helped us
                      increase productivity by 35%."
                    </p>
                  </div>
                  <div className="mt-6 flex items-center space-x-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Michael Chen"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Michael Chen</p>
                      <p className="text-sm text-muted-foreground">CTO, GrowthStartup</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      "The analytics features alone are worth the investment. We now have clear visibility into our
                      project timelines and resource allocation."
                    </p>
                  </div>
                  <div className="mt-6 flex items-center space-x-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Emily Rodriguez"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Emily Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Director of Operations, CreativeAgency</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="default" className="px-3 py-1">
                  Pricing
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, transparent pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Choose the plan that's right for your team. All plans include a 14-day free trial.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>Perfect for small teams just getting started</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">$9</span>
                    <span className="ml-1 text-muted-foreground">/user/month</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Up to 5 team members</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Basic task management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>5GB storage</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="h-full relative">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Professional</CardTitle>
                  <CardDescription>For growing teams that need more</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">$19</span>
                    <span className="ml-1 text-muted-foreground">/user/month</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited team members</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced task management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>20GB storage</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Priority email support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced analytics</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations with specific needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="ml-1 text-muted-foreground">/user/month</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited everything</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>100GB storage</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>24/7 phone & email support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Custom reporting</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to streamline your workflow?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of teams already using StreamLine to improve their productivity.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1">
                  Get started for free
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Schedule a demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="StreamLine Logo"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <span className="text-xl font-bold">StreamLine</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Streamline your workflow with our powerful project management platform.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} StreamLine. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

