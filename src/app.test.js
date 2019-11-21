const app = require("./app");
const request = require("supertest");

const regex = {
  ipAddress: /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
};

describe("Testing the REST API", () => {
  it("/api/whoami return json", done => {
    request(app)
      .get("/api/whoami")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("has the IP address", async () => {
    const res = await request(app).get("/api/whoami");
    expect(res.body.ipaddress).toMatch(regex.ipAddress);
  });

  it("has the preferred language", async () => {
    const res = await request(app)
      .get("/api/whoami")
      .set("Accept-Language", "en-US,en;q=0.5");
    expect(res.body.language).toBe("en-US,en;q=0.5");
    // console.log({ request: res.request, res: res.res, req: res.req });
  });

  it("has the system infos", async () => {
    const res = await request(app).get("/api/whoami");
    expect(res.body.software).not.toBeNull();
    expect(res.body.software).toBeDefined();
  });
});
