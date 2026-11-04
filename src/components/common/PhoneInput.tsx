import * as React from "react";  
import { Input } from "@/components/ui/input";  
import { cn } from "@/lib/utils";  

type PhoneInputProps = {  
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
} & Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref">;

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(  
  ({ error, className, onChange, value, placeholder = "Enter phone number", ...props }, ref) => {  
    const [phoneValue, setPhoneValue] = React.useState(value || "");
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setPhoneValue(newValue);
      onChange?.(newValue);
    };

    return (  
      <div className="flex flex-col">
        <div className="flex">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-l-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue="+255"
          >
            <option value="+255">🇹🇿 +255</option>
            <option value="+254">🇰🇪 +254</option>
            <option value="+256">🇺🇬 +256</option>
            <option value="+250">🇷🇼 +250</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
          </select>
          <Input
            ref={ref}
            type="tel"
            value={phoneValue}
            onChange={handleChange}
            placeholder={placeholder}
            className={cn("rounded-l-none rounded-r-md", className)}
            {...props}
          />
        </div>
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>  
    );  
  },  
);  
PhoneInput.displayName = "PhoneInput";  


export { PhoneInput };