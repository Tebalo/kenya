'use client';

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Entity {
  id: string;
  name: string;
  code: string;
}

const entities: Entity[] = [
  {
    id: "1",
    name: "Water Utilities Corporation",
    code: "wuc"
  },
  {
    id: "2",
    name: "Botswana Power Corporation",
    code: "bpc"
  },
  {
    id: "3",
    name: "Air Botswana",
    code: "ab"
  }
];

interface EntitySelectorProps {
  selectedEntities: Entity[];
  setSelectedEntities: (entities: Entity[]) => void;
}

export function EntitySelector({ selectedEntities, setSelectedEntities }: EntitySelectorProps) {
  const handleSelect = (entityCode: string) => {
    const entity = entities.find(e => e.code === entityCode);
    if (!entity) return;
    
    if (!selectedEntities.find(e => e.id === entity.id)) {
      setSelectedEntities([...selectedEntities, entity]);
    }
  };

  const removeEntity = (entityId: string) => {
    setSelectedEntities(selectedEntities.filter(e => e.id !== entityId));
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <Select onValueChange={handleSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select an entity to compare" />
          </SelectTrigger>
          <SelectContent>
            {entities
              .filter(entity => !selectedEntities.find(e => e.id === entity.id))
              .map(entity => (
                <SelectItem key={entity.id} value={entity.code}>
                  {entity.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2">
          {selectedEntities.map(entity => (
            <Badge key={entity.id} variant="secondary" className="px-2 py-1">
              {entity.name}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                onClick={() => removeEntity(entity.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}