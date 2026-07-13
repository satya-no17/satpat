import { SwatchBook } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Button } from '@/components/ui/button';


function Element({ selectedEl, setSelectedElement, onCommit }) {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState("");
  const [align, setAlign] = useState(selectedEl?.style?.textAlign || "");

  const applyStyle = (property, value) => {
    if (selectedEl) {
      selectedEl.style[property] = value;
      onCommit?.();
    }
  };

  // Reset local UI state whenever a new element is selected
  useEffect(() => {
    setAlign(selectedEl?.style?.textAlign || "");
  }, [selectedEl]);

  // Update alignment style when toggled
  useEffect(() => {
    if (selectedEl) {
      selectedEl.style.textAlign = align || "";
      onCommit?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [align]);


  // Keep in sync if element classes are modified elsewhere
  useEffect(() => {
    if (!selectedEl) return;

    // set initial classes
    const currentClasses = selectedEl.className
      .split(" ")
      .filter((c) => c.trim() !== "");
    setClasses(currentClasses);

    // watch for future class changes
    const observer = new MutationObserver(() => {
      const updated = selectedEl.className
        .split(" ")
        .filter((c) => c.trim() !== "");
      setClasses(updated);
    });

    observer.observe(selectedEl, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [selectedEl]);

  // Remove a class
  const removeClass = (cls) => {
    const updated = classes.filter((c) => c !== cls);
    setClasses(updated);
    selectedEl.className = updated.join(" ");
    onCommit?.();
  };

  // Add new class
  const addClass = () => {
    const trimmed = newClass.trim();
    if (!trimmed) return;
    if (!classes.includes(trimmed)) {
      const updated = [...classes, trimmed];
      setClasses(updated);
      selectedEl.className = updated.join(" ");
      onCommit?.();
    }
    setNewClass("");
  };

  return (
    <div className='mt-2 w-full space-y-4 overflow-auto rounded-xl border bg-background p-4 shadow-sm lg:mr-2 lg:h-[85vh] lg:w-52'>
      <h2 className='flex gap-2 items-center font-bold'>
        <SwatchBook /> Settings
      </h2>

      {/* Font Size + Text Color inline */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className='text-sm'>Font Size</label>
          <Select
            key={selectedEl?.dataset?.editId || 'no-el'}
            defaultValue={selectedEl?.style?.fontSize || '24px'}
            onValueChange={(value) => applyStyle('fontSize', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(53)].map((_, index) => (
                <SelectItem value={index + 12 + 'px'} key={index}>
                  {index + 12}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='text-sm block'>Text Color</label>
          <input type='color'
            className='w-[40px] h-[40px] rounded-lg mt-1'
            value={selectedEl?.style?.color || '#000000'}
            onChange={(event) => applyStyle('color', event.target.value)}
          />
        </div>
      </div>

      {/* Text Alignment */}
      <div>
        <label className="text-sm mb-1 block">Text Alignment</label>
        <ToggleGroup
          type="single"
          value={align ?? ""}
          onValueChange={(value) => setAlign(value ?? "")}
          className="bg-gray-100 rounded-lg p-1 inline-flex w-full justify-between"
        >
          <ToggleGroupItem value="left" className="p-2 rounded hover:bg-gray-200 flex-1">
            <AlignLeft size={20} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" className="p-2 rounded hover:bg-gray-200 flex-1">
            <AlignCenter size={20} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" className="p-2 rounded hover:bg-gray-200 flex-1">
            <AlignRight size={20} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Background Color + Border Radius inline */}
      <div className="flex items-center gap-4">
        <div>
          <label className='text-sm block'>Background</label>
          <input type='color'
            className='w-[40px] h-[40px] rounded-lg mt-1'
            key={selectedEl?.dataset?.editId ? `${selectedEl.dataset.editId}-bg` : 'no-el-bg'}
            defaultValue={selectedEl?.style?.backgroundColor || '#ffffff'}
            onChange={(event) => applyStyle('backgroundColor', event.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className='text-sm'>Border Radius</label>
          <Input type='text'
            key={selectedEl?.dataset?.editId ? `${selectedEl.dataset.editId}-radius` : 'no-el-radius'}
            placeholder='e.g. 8px'
            defaultValue={selectedEl?.style?.borderRadius || ''}
            onChange={(e) => applyStyle('borderRadius', e.target.value)}
            className='mt-1'
          />
        </div>
      </div>

      {/* Padding */}
      <div>
        <label className='text-sm'>Padding</label>
        <Input type='text'
          key={selectedEl?.dataset?.editId ? `${selectedEl.dataset.editId}-padding` : 'no-el-padding'}
          placeholder='e.g. 10px 15px'
          defaultValue={selectedEl?.style?.padding || ''}
          onChange={(e) => applyStyle('padding', e.target.value)}
          className='mt-1'
        />
      </div>

      {/* Margin */}
      <div>
        <label className='text-sm'>Margin</label>
        <Input type='text'
          key={selectedEl?.dataset?.editId ? `${selectedEl.dataset.editId}-margin` : 'no-el-margin'}
          placeholder='e.g. 10px 15px'
          defaultValue={selectedEl?.style?.margin || ''}
          onChange={(e) => applyStyle('margin', e.target.value)}
          className='mt-1'
        />
      </div>

      {/* === Class Manager === */}

      <div>
        <label className="text-sm font-medium">Classes</label>

        {/* Existing classes as removable chips */}
        <div className="flex flex-wrap gap-2 mt-2">
          {classes.length > 0 ? (
            classes.map((cls) => (
              <span
                key={cls}
                className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm"
              >
                {cls}
                <button
                  onClick={() => removeClass(cls)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">No classes applied</span>
          )}
        </div>

        {/* Add new class input */}
        <div className="flex gap-2 mt-3">
          <Input
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
            placeholder="Add class..."
          />
          <Button type="button" onClick={addClass}>
            Add
          </Button>
        </div>
      </div>



    </div>
  )
}

export default Element;
