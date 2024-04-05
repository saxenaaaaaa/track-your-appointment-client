export function getTodaysDate() {
    // returns today's date in dd/mm/yyyy format
    const now = new Date();
    let day = ((now.getDate() < 10) ? `0${now.getDate()}` : `${now.getDate()}`);
    let month = (((now.getMonth()+1) < 10) ? `0${now.getMonth()+1}` : `${now.getMonth()+1}`); // month starts at 0
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
}