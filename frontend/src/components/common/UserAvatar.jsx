const UserAvatar = ({ fullName, size = "md" }) => {
  const initials =
    fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase() || "";

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div className="avatar placeholder">
      <div
        className={`flex items-center justify-center rounded-full bg-primary text-primary-content font-semibold ${sizes[size]}`}
      >
        <span>{initials}</span>
      </div>
    </div>
  );
};

export default UserAvatar;