const ErrorMessage = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
        backgroundColor: "rgb(251,167,70)",
        textAlign: "center",
        color: "black",
        textTransform: "capitalize",
      }}
    >
      {children}
    </div>
  );
};

export default ErrorMessage;
