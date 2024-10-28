function skillsMember() {
  return {
    name: "John Doe",
    age: 25,
    skills: ["Javascript", "React", "Node"],
    // Method
    getSkills: function() {
      return this.skills;
    }
  };
}