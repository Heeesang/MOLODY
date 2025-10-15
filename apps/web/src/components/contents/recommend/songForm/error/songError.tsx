type SongErrorProps = {
  message: string;
  url?: string;
  onCancel: () => void;
};

export default function SongError({ message, url, onCancel }: SongErrorProps) {
  return (
    <div className="text-red-500 mt-2">
      <p>
        {message}
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-1">
            {url}
          </a>
        )}
      </p>
      {url && (
        <button onClick={onCancel} className="bg-red-500 mt-2">
          취소
        </button>
      )}
    </div>
  );
}