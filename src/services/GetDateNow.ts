class GetDateTimeNow {
  public execute(): Date {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // TODO
    const todayFormattedDate = yyyy + '-' + mm + '-' + dd + 'T' + time;

    const todayDate = new Date(todayFormattedDate);

    return todayDate;
  }
}

export default GetDateTimeNow;
