import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Calendar } from "../../../components/ui/calendar";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

interface ScheduleOptionsProps {
  scheduleType: "now" | "schedule";
  onScheduleTypeChange: (type: "now" | "schedule") => void;
  selectedDate?: Date;
  onDateSelect: (date?: Date) => void;
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

export default function ScheduleOptions({
  scheduleType,
  onScheduleTypeChange,
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeChange,
}: ScheduleOptionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Options</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={scheduleType}
          onValueChange={(v) => onScheduleTypeChange(v as any)}
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="now">Post Now</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-4 space-y-4">
            {/* Date Picker */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDate}
                    onSelect={onDateSelect}
                    mode="single"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Picker */}
            <div className="space-y-2">
              <Label>Time</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => onTimeChange(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
