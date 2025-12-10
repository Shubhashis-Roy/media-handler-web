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
import { ImageIcon } from "lucide-react";

interface LivePreviewProps {
  content: string;
}

export default function LivePreview({ content }: LivePreviewProps) {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="instagram">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
            <TabsTrigger value="twitter">X</TabsTrigger>
          </TabsList>

          {/* Instagram preview */}
          <TabsContent value="instagram" className="mt-4">
            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm">your_account</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>

              <div className="aspect-square bg-muted rounded flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>

              <p className="text-sm whitespace-pre-wrap">
                {content || "Your post content will appear here..."}
              </p>
            </div>
          </TabsContent>

          {/* Twitter preview */}
          <TabsContent value="twitter" className="mt-4">
            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary rounded-full" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">Your Name</p>
                  <p className="text-xs text-muted-foreground">
                    @yourhandle · now
                  </p>
                  <p className="text-sm mt-2 whitespace-pre-wrap">
                    {content || "Your post content will appear here..."}
                  </p>

                  {content && (
                    <div className="mt-3 aspect-video bg-muted rounded flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
