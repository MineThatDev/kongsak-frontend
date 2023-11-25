export default function role() {
  const permission = (level) => {
    if (level === 1) {
      return ["guest", "user", "admin", "creator"];
    } else if (level === 2) {
      return ["user", "admin", "creator"];
    } else if (level === 3) {
      return ["admin", "creator"];
    } else if (level === 4) {
      return ["creator"];
    }
  };
  return { permission };
}
