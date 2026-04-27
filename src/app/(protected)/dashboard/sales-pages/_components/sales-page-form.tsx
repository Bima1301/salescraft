"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { salesPageBodySchema, type SalesPageBodyInput } from "../_server/type";
import {
  Sparkles,
  Plus,
  X,
  Package,
  Users,
  DollarSign,
  Star,
  Zap,
  Palette,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SalesPageFormProps {
  defaultValues?: Partial<SalesPageBodyInput>;
  onSubmit: (data: SalesPageBodyInput) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

const templates = [
  {
    id: "modern",
    label: "Modern",
    description: "Clean & minimal",
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    id: "bold",
    label: "Bold",
    description: "High impact",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "elegant",
    label: "Elegant",
    description: "Sophisticated",
    gradient: "from-emerald-500 to-teal-500",
  },
] as const;

export function SalesPageForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = "Generate Sales Page",
}: SalesPageFormProps) {
  const [featureInput, setFeatureInput] = useState("");
  const [uspInput, setUspInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SalesPageBodyInput>({
    resolver: zodResolver(salesPageBodySchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      features: [],
      targetAudience: "",
      price: "",
      uniqueSellingPoints: [],
      template: "modern",
      ...defaultValues,
    },
  });

  const features = watch("features");
  const uniqueSellingPoints = watch("uniqueSellingPoints");
  const selectedTemplate = watch("template");

  function addFeature() {
    const trimmed = featureInput.trim();
    if (trimmed && !features.includes(trimmed)) {
      setValue("features", [...features, trimmed]);
      setFeatureInput("");
    }
  }

  function removeFeature(index: number) {
    setValue(
      "features",
      features.filter((_, i) => i !== index),
    );
  }

  function addUsp() {
    const trimmed = uspInput.trim();
    if (trimmed && !uniqueSellingPoints.includes(trimmed)) {
      setValue("uniqueSellingPoints", [...uniqueSellingPoints, trimmed]);
      setUspInput("");
    }
  }

  function removeUsp(index: number) {
    setValue(
      "uniqueSellingPoints",
      uniqueSellingPoints.filter((_, i) => i !== index),
    );
  }

  const inputClass = cn(
    "flex w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm",
    "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "placeholder:text-muted-foreground",
  );

  const labelClass = "block text-sm font-medium mb-2";
  const fieldClass = "space-y-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Product Info */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <Package className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Product Information</h3>
        </div>

        <div className={fieldClass}>
          <label htmlFor="productName" className={labelClass}>
            Product / Service Name <span className="text-destructive">*</span>
          </label>
          <input
            id="productName"
            {...register("productName")}
            className={inputClass}
            placeholder="e.g. TaskFlow Pro"
          />
          {errors.productName && (
            <p className="text-xs text-destructive">
              {errors.productName.message}
            </p>
          )}
        </div>

        <div className={fieldClass}>
          <label htmlFor="productDescription" className={labelClass}>
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            id="productDescription"
            {...register("productDescription")}
            rows={3}
            className={cn(inputClass, "resize-none")}
            placeholder="Describe what your product does and the problem it solves..."
          />
          {errors.productDescription && (
            <p className="text-xs text-destructive">
              {errors.productDescription.message}
            </p>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Key Features</h3>
          <span className="text-xs text-muted-foreground">
            (min. 1 required)
          </span>
        </div>

        <div className="flex gap-2">
          <input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addFeature();
              }
            }}
            className={cn(inputClass, "flex-1")}
            placeholder="e.g. Real-time collaboration"
          />
          <Button
            type="button"
            onClick={addFeature}
            variant="outline"
            size="icon"
            className="rounded-md h-10 w-10 shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {features.map((feature, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="gap-1.5 pl-3 pr-2 py-1.5 text-xs"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        {errors.features && (
          <p className="text-xs text-destructive">{errors.features.message}</p>
        )}
      </div>

      {/* Target Audience & Price */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Target Audience</h3>
          </div>
          <div className={fieldClass}>
            <label htmlFor="targetAudience" className={labelClass}>
              Who is this for? <span className="text-destructive">*</span>
            </label>
            <input
              id="targetAudience"
              {...register("targetAudience")}
              className={inputClass}
              placeholder="e.g. Small business owners"
            />
            {errors.targetAudience && (
              <p className="text-xs text-destructive">
                {errors.targetAudience.message}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Pricing</h3>
          </div>
          <div className={fieldClass}>
            <label htmlFor="price" className={labelClass}>
              Price <span className="text-destructive">*</span>
            </label>
            <input
              id="price"
              {...register("price")}
              className={inputClass}
              placeholder="e.g. $49/month or $299 one-time"
            />
            {errors.price && (
              <p className="text-xs text-destructive">{errors.price.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* USP */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Unique Selling Points</h3>
          <span className="text-xs text-muted-foreground">(optional)</span>
        </div>

        <div className="flex gap-2">
          <input
            value={uspInput}
            onChange={(e) => setUspInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addUsp();
              }
            }}
            className={cn(inputClass, "flex-1")}
            placeholder="e.g. Only solution with live AI coaching"
          />
          <Button
            type="button"
            onClick={addUsp}
            variant="outline"
            size="icon"
            className="rounded-md h-10 w-10 shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {uniqueSellingPoints.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {uniqueSellingPoints.map((usp, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="gap-1.5 pl-3 pr-2 py-1.5 text-xs"
              >
                {usp}
                <button
                  type="button"
                  onClick={() => removeUsp(i)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Template */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Design Template</h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setValue("template", t.id)}
              className={cn(
                "relative rounded-md border border-border p-4 text-left transition-all",
                selectedTemplate === t.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50",
              )}
            >
              <div
                className={cn(
                  "mb-2 h-1.5 w-full rounded-full bg-gradient-to-r",
                  t.gradient,
                )}
              />
              <p className="text-sm font-medium">{t.label}</p>
              <p className="text-xs text-muted-foreground">{t.description}</p>
              {selectedTemplate === t.id && (
                <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 bg-[var(--color-secondary-1)] border-0 text-white hover:bg-[var(--color-secondary-2)] text-base font-medium"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating with AI...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            {submitLabel}
          </span>
        )}
      </Button>
    </form>
  );
}
