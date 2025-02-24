class Schedulers {
  private static instance: Schedulers;
  private constructor() {}

  public static getInstance(): Schedulers {
    if (!Schedulers.instance) {
      Schedulers.instance = new Schedulers();
    }
    return Schedulers.instance;
  }

  public async run() {
    console.log("Running schedulers");
  }
}
