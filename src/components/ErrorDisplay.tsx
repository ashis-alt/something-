const ErrorDisplay = ({ message = "Something went wrong" }: { message?: string }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;