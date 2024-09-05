/* eslint-disable react/prop-types */
function ErrorComponent({ message }) {
  return (
    <div className="text-red-500 text-center py-4">
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
}

export default ErrorComponent;
