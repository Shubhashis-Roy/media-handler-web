import { Loader2 } from "lucide-react";
import { Button } from "../../components/radix-ui/button";

type Props = {
  isLoading: boolean;
  onClick: () => void;
};

export default function LoadMore({ isLoading, onClick }: Props) {
  return (
    <div className="flex justify-center py-6">
      <Button
        variant="outline"
        className="px-6 py-4 rounded-xl border-[var(--color-border)] shadow-md hover:shadow-lg transition-all"
        disabled={isLoading}
        onClick={onClick}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading…
          </>
        ) : (
          "Load More Activity"
        )}
      </Button>
    </div>
  );
}
