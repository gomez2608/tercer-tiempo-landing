"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CheckCircle, CloudRainWind, Clock, Users, Star, ArrowRight, Menu} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logo from "@/app/imgs/Bare Organics.zip - 1 2.svg"
import fondo from "@/app/imgs/fondo.jpg"
import balon from "@/app/imgs/balon.jpg"
import test1 from "@/app/imgs/test1.png"
import test2 from "@/app/imgs/test2.jpg"
import test3 from "@/app/imgs/test3.jpg"
import facebook from "@/app/imgs/Facebook_Logo_Primary.png"
import instagram from "@/app/imgs/Instagram_Glyph_Black.jpg"
import whatsapp from "@/app/imgs/Digital_Glyph_Black.png"
import { useState, useEffect } from "react"


export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const year = new Date().getFullYear();

  const handleNavClick = (section: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActiveSection(section);

    // Get the target element
    const targetElement = document.getElementById(section);
    if (targetElement) {
      // Scroll to the element with smooth behavior
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Update URL hash without jump (optional)
      window.history.pushState(null, '', `#${section}`);
    }
  };

  // Add an effect to handle initial load with hash
  useEffect(() => {
    if (window.location.hash) {
      const section = window.location.hash.substring(1);
      setActiveSection(section);
      
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky flex top-0 z-50 w-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 justify-between items-center px-4 py-2">
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
              href="#about" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "about" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={(e) => handleNavClick("about", e)}
            >
              ¿Quiénes somos?
            </Link>
            <Link 
              href="#services" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "services" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={(e) => handleNavClick("services", e)}
            >
              Nuestros servicios
            </Link>
            
            <Link 
              href="#features" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "features" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={(e) => handleNavClick("features", e)}
            >
              Características
            </Link>
            <Link 
              href="#testimonials" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "testimonials" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={(e) => handleNavClick("testimonials", e)}
            >
              Opiniones
            </Link>
            <Link 
              href="#contact" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "contact" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={(e) => handleNavClick("contact", e)}
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
              href="#about" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "about" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={(e) => handleNavClick("about", e)}
            >
              ¿Quiénes somos?
            </Link>
            <Link 
              href="#services" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "services" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={(e) => handleNavClick("services", e)}
            >
              Nuestros servicios
            </Link>
            <Link 
              href="#testimonials" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "testimonials" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={(e) => handleNavClick("testimonials", e)}
            >
              Opiniones
            </Link>
            <Link 
              href="#features" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "features" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={(e) => handleNavClick("features", e)}
            >
              Características
            </Link>
            <Link 
              href="#contact" 
              className={`text-sm font-medium px-3 py-2 rounded-md ${activeSection === "contact" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              onClick={(e) => handleNavClick("contact", e)}
            >
              Contactanos
            </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
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
            <div className="grid gap-6 lg:gap-12 mx-5 px-5">
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
        </section>

        
        {/* Pricing Section */}
        <section id="services" className="w-full py-8 md:py-20 lg:py-26 bg-muted/50">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="default" className="px-3 py-1">
                  Nuestros servicios
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Precios justos, económicos y simples.</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  ¿Alguna duda? Contáctanos y te ayudaremos a encontrar el plan perfecto para ti.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="h-auto">
                <CardHeader>
                  <CardTitle>Cliente frecuente</CardTitle>
                  <CardDescription>Si has jugado 10 o más veces con nosotros.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">1 hora</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Gratis por cada 10 partidos.</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Disponible con nuestra tarjeta cliente frecuente.</span>
                    </li>
                
                  </ul>
                </CardContent>
                <CardFooter>
                <Link 
                  href="https://wa.me/573112311293?text=Hola%20quiero%20ser%20un%20cliente%20frecuente"
                  target="_blank"
                  >
                  <Button className="w-full">Contáctanos</Button>
                </Link>
                </CardFooter>
              </Card>
              <Card className="h-full relative">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Más popular
                </div>
                <CardHeader>
                  <CardTitle>Reserva</CardTitle>
                  <CardDescription>1 hora para disfrutar tu futbol al máximo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">$50.000</span>
                    <span className="ml-1 text-muted-foreground">/hora</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Disponibilidad exclusiva</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Adquiere nuestra tarjeta cliente frecuente</span>
                    </li>
                    
                  </ul>
                </CardContent>
                <CardFooter>
                <Link 
                  href="https://wa.me/573112311293?text=Hola%20quiero%20reservar%20una%20cancha"
                  target="_blank"
                  >
                  <Button className="w-full" variant="default">
                    Reserva ya
                  </Button>

                </Link>
                </CardFooter>
              </Card>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Celebra con nosotros</CardTitle>
                  <CardDescription>Para celebraciones o eventos especiales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-3">
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Cumpleaños</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Eventos especiales</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Asados</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Integraciones</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                <Link 
                  href="https://wa.me/573112311293?text=Hola%20quiero%cotizar%20un%20evento"
                  target="_blank"
                  >
                  <Button className="w-full">Cotiza ya</Button>

                </Link>
                </CardFooter>
              </Card>
            </div>
        </section>


        {/* Features Section */}
        <section id="features" className="w-full  bg-muted/50">
          
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="default" className="px-3 py-1">
                  ¿Qué ofrecemos?
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  LLeva tus partidos al 100%
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Nuestra cancha ofrece las mejores condiciones para desbloquear tu juego al máximo
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
              <div className="grid gap-6">
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <CloudRainWind className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">Protección contra la lluvia</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">
                      ¿Tiempo difícil? ¿Lluvia incesante? Contamos con una cancha cubierta para que puedas jugar incluso en las peores condiciones
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">El tiempo justo</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">
                      Nuestro sistema de cronometrado ofrece exactitud y justicia en todos los partidos. Hasta el último segundo cuenta.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">La mejor atención</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">
                      Nuestro personal está siempre dispuesto a atenderte. Incluso si necesitas bebidas durante el partido.
                    </p>
                  </CardContent>
                </Card>
                
              </div>
              <div className="flex items-center justify-center flex-col">
               
                <Image
                  src={balon}
                  alt="Features illustration"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full bg-muted/50">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="default" className="px-3 py-1">
                  ¿Que opinan nuestros clientes?
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">La cancha favorita de todos</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                No solo lo decimos nosotros, nuestros clientes hablan por sí solos. 
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
                    &ldquo;Jugar en esta cancha es una experiencia increíble. El pasto sintético tiene un gran agarre.&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 flex items-center space-x-3">
                    <Image
                      src={test1}
                      alt="Sarah Johnson"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Andres L.</p>
                      <p className="text-sm text-muted-foreground">Futbolista amateur</p>
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
                    &ldquo;Esta cancha está a otro nivel. La iluminación es ideal para los partidos nocturnos. ¡100% recomendada!&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 flex items-center space-x-3">
                    <Image
                      src={test2}
                      alt="Michael Chen"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Santiago P.</p>
                      <p className="text-sm text-muted-foreground">Futbolista amateur.</p>
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
                    &ldquo;Mi hijo juega aquí cada semana y estoy tranquilo porque la cancha es segura y bien mantenida.&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 flex items-center space-x-3">
                    <Image
                      src={test3}
                      alt="Emily Rodriguez"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Luis M.</p>
                      <p className="text-sm text-muted-foreground">Padre de futbolista juvenil.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  ¿Listo para llevar tus partidos al siguiente nivel?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Únete a nuestra comunidad y disfruta de los beneficios de jugar en la mejor cancha de Ubaté.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                
              <Link 
              href="https://wa.me/573112311293?text=Hola%20quiero%20reservar%20una%20cancha"
              target="_blank"
              >
                  <Button 
                    size="lg" 
                    className="gap-1"
                    
                    >
                    Reserva ya
                    <ArrowRight className="h-4 w-4" />
                  </Button>
              </Link>
              <Link 
                href="mailto:canchasintetica3ertiempo@gmail.com"
                target="_blank"
              >
                <Button variant="outline" size="lg">
                  Contáctanos
                </Button>
              </Link>
              </div>
            </div>
          
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
          <div className="grid gap-8 lg:grid-cols-2 mx-8 px-8 justify-center">
            <div className="space-y-4 items-center justify-center">
              <div className="flex items-center gap-2">
                <Image
                  src={logo}
                  alt="StreamLine Logo"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <span className="text-xl font-bold">Tercer tiempo Ubaté</span>
              </div>
              <p className="text-sm text-muted-foreground">
                La cancha sintética todo en 1 en Ubaté.
              </p>
              <div className="flex gap-4">
                <Link 
                href="https://www.facebook.com/people/Cancha-sint%C3%A9tica-Tercer-Tiempo/100031018192314/" 
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                >
                  <Image
                    src={facebook}
                    alt="StreamLine Logo"
                    width={32}
                    height={32}
                    className="rounded"
                  />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link 
                href="https://www.instagram.com/tercer_tiempo_ubate?igsh=MTFoMDh6NGNwZzh3bQ==" 
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                >
                <Image
                    src={instagram}
                    alt="StreamLine Logo"
                    width={32}
                    height={32}
                    className="rounded"
                  />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link 
                href="https://wa.me/573112311293?text=Hola%20quiero%20mas%20informacion" 
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                >
                <Image
                    src={whatsapp}
                    alt="StreamLine Logo"
                    width={32}
                    height={32}
                    className="rounded"
                  />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link 
                  href="#services" 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => handleNavClick("services", e)}
                  >
                    Nuestros servicios
                  </Link>
                </li>
                <li>
                  <Link 
                  href="#features" 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => handleNavClick("features", e)}
                  >
                    Características
                  </Link>
                </li>
                <li>
                  <Link 
                  href="#testimonials" 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => handleNavClick("testimonials", e)}
                  >
                    Opiniones
                  </Link>
                </li>
                <li>
                  <Link 
                  href="#contact" 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => handleNavClick("contact", e)}
                  >
                    Contactanos
                  </Link>
                </li>
              </ul>
            </div>
            
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {year} Tercer tiempo Ubaté. Todos los derechos reservados.</p>
          </div>
        
      </footer>
    </div>
  )
}

