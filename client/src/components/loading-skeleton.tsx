export function LoadingSkeleton() {
    return (
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="rounded-lg border border-border bg-card shadow-sm p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full skeleton bg-muted dark:bg-muted/50 mb-4"></div>
              <div className="w-32 h-6 skeleton bg-muted dark:bg-muted/50 mb-2"></div>
              <div className="w-24 h-4 skeleton bg-muted dark:bg-muted/50 mb-4"></div>
              <div className="w-full h-16 skeleton bg-muted dark:bg-muted/50 mb-4"></div>
              <div className="w-full grid grid-cols-2 gap-2">
                <div className="h-8 skeleton bg-muted dark:bg-muted/50"></div>
                <div className="h-8 skeleton bg-muted dark:bg-muted/50"></div>
                <div className="h-8 skeleton bg-muted dark:bg-muted/50"></div>
                <div className="h-8 skeleton bg-muted dark:bg-muted/50"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-6">
            <div className="w-32 h-8 skeleton bg-muted dark:bg-muted/50 mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="h-24 skeleton bg-muted dark:bg-muted/50 rounded-lg"></div>
              <div className="h-24 skeleton bg-muted dark:bg-muted/50 rounded-lg"></div>
              <div className="h-24 skeleton bg-muted dark:bg-muted/50 rounded-lg"></div>
            </div>
          </div>
          
          <div className="w-36 h-8 skeleton bg-muted dark:bg-muted/50 mb-4"></div>
          <div className="mb-6 h-80 skeleton bg-muted dark:bg-muted/50 rounded-lg"></div>
          
          <div className="w-48 h-8 skeleton bg-muted dark:bg-muted/50 mb-4"></div>
          <div className="grid gap-4">
            <div className="h-32 skeleton bg-muted dark:bg-muted/50 rounded-lg"></div>
            <div className="h-32 skeleton bg-muted dark:bg-muted/50 rounded-lg"></div>
            <div className="h-32 skeleton bg-muted dark:bg-muted/50 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }
  