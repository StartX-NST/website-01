import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

export default function CheckEligibility() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you within 3-5 business days.",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="bg-card border-border text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-3xl font-display">Application Received!</CardTitle>
              <CardDescription className="text-lg">
                Thank you for your interest in STARTX. We'll review your application and contact you soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="/">Back to Home</a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-display font-bold mb-4">Check Eligibility</h1>
          <p className="text-xl text-muted-foreground">
            Join the STARTX community and accelerate your entrepreneurial journey
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl">Application Form</CardTitle>
            <CardDescription>Tell us about yourself and your entrepreneurial interests</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input 
                    id="firstName" 
                    required 
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input 
                    id="lastName" 
                    required 
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  required 
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campus">Campus / University *</Label>
                <Input 
                  id="campus" 
                  required 
                  className="bg-background border-border"
                  placeholder="e.g., Stanford University"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year of Study *</Label>
                <Select required>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freshman">Freshman</SelectItem>
                    <SelectItem value="sophomore">Sophomore</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="graduate">Graduate Student</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Skills / Interests *</Label>
                <Input 
                  id="interests" 
                  required 
                  className="bg-background border-border"
                  placeholder="e.g., Product Design, AI, Marketing"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Previous Entrepreneurial Experience</Label>
                <Textarea 
                  id="experience" 
                  className="bg-background border-border min-h-24"
                  placeholder="Tell us about any startups, projects, or entrepreneurial activities you've been involved in"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to join STARTX? *</Label>
                <Textarea 
                  id="motivation" 
                  required 
                  className="bg-background border-border min-h-32"
                  placeholder="Share your motivation and what you hope to achieve through STARTX"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6"
              >
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Eligibility Criteria */}
        <Card className="mt-8 bg-card border-border">
          <CardHeader>
            <CardTitle>Eligibility Criteria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <p className="text-muted-foreground">Currently enrolled student or recent alumni (within 2 years)</p>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <p className="text-muted-foreground">Passion for entrepreneurship and innovation</p>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <p className="text-muted-foreground">Commitment to actively participate in the community</p>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <p className="text-muted-foreground">Interest in building or joining a startup</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
