module.exports = {
	goalProgress: function (goals, books) {
		const currentYear = new Date().getFullYear();
		const currentGoal = goals[currentYear];
		const currentBooks =
			books.filter((book) => book.year === currentYear)[0].books || 0;
		const iteration = 365 / currentGoal; // divide the year by the goal to get the iteration
		const startOfYear = new Date(currentYear, 0, 1);
		const today = new Date();
		const daysSinceStartOfYear = Math.floor(
			(today - startOfYear) / (1000 * 60 * 60 * 24)
		);
		const yearProgress = Math.floor(daysSinceStartOfYear / iteration);

		let status = "";
		if (yearProgress < currentBooks) {
			status = `${currentBooks - yearProgress} books ahead of schedule `;
		} else if (yearProgress > currentBooks) {
			status = `${yearProgress - currentBooks} books behind schedule`;
		} else {
			status = "On track!";
		}
		return `
      <div class="goalProgress">
        <div><progress max="${currentGoal}" value="${currentBooks}"></progress> ${currentBooks}/${currentGoal} books</div>
        <div>${status}</div>
        
      </div>`;
	},
};
