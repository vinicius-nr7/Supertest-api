const request = require("supertest");
const ApiUrl = "https://restful-booker.herokuapp.com";

describe("POST e GET reservas", () => {
    it("cadastrar uma reserva e validar o ID", async () => {
        const newBooking = {
            firstname: "Vinicius",
            lastname: "Nascimento",
            totalprice: 107,
            depositpaid: true,
            bookingdates: {
                checkin: "2018-01-01",
                checkout: "2019-01-01"
            },
            additionalneeds: "Breakfast"
        };

        // 1. Cria a reserva
        const createResponse = await request(ApiUrl)
            .post('/booking')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(newBooking)
            .expect(200);

        console.log("Reserva criada:", createResponse.body);

        // Valida os dados do cadastro
        expect(createResponse.body.booking.firstname).toEqual("Vinicius");
        expect(createResponse.body.booking.lastname).toEqual("Nascimento");
        expect(createResponse.body.booking.totalprice).toEqual(107);
        expect(createResponse.body.booking.depositpaid).toBeTruthy();
        expect(createResponse.body.booking.bookingdates.checkin).toEqual("2018-01-01");
        expect(createResponse.body.booking.bookingdates.checkout).toEqual("2019-01-01");
        expect(createResponse.body.booking.additionalneeds).toEqual("Breakfast");

        // Pega o ID gerado dinamicamente pela API
        const bookingId = createResponse.body.bookingid;

        // 2. Faz o GET utilizando o ID que realmente existe
        await request(ApiUrl)
            .get(`/booking/${bookingId}`)
            .set("Accept", "application/json")
            .expect(200)
            .then(getResponse => {
                // Valida se os dados retornados no GET batem com o cadastro
                expect(getResponse.body.firstname).toEqual("Vinicius");
                expect(getResponse.body.lastname).toEqual("Nascimento");
            });
    });
});
