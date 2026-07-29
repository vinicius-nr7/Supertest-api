const request = require("supertest");
const ApiUrl = "https://restful-booker.herokuapp.com";

describe("GET /booking/", () => {
    it("Deve listar as reservas, criar uma nova, buscar pelo ID e printar", async () => {
        // 1. Faz o GET geral para listar os IDs de reservas existentes
        const getListResponse = await request(ApiUrl)
            .get('/booking')
            .set("Accept", "application/json")
            .expect(200);

        console.log("Lista de IDs de reservas (GET geral):", getListResponse.body);

        // 2. Cria uma reserva para garantir que teremos um ID específico garantido para o GET por ID
        const createResponse = await request(ApiUrl)
            .post('/booking')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                firstname: "Teste",
                lastname: "User",
                totalprice: 150,
                depositpaid: true,
                bookingdates: { checkin: "2024-01-01", checkout: "2024-01-05" },
                additionalneeds: "Lunch"
            });

        const bookingId = createResponse.body.bookingid;

        // 3. Faz o GET por ID (GET /booking/:id) e printa o resultado
        return request(ApiUrl)
            .get(`/booking/${bookingId}`)
            .set("Accept", "application/json")
            .expect(200)
            .then(response => {
                console.log("Detalhes da reserva buscada pelo ID (GET /booking/:id):", response.body);
            });
    });
});