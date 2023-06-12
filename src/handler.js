const { nanoid } = require('nanoid');
const Books = require('./books');

const addBooksHandler = (request, h) => {
    const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    const id = nanoid(16);
    const finished = parseFloat(readPage) === pageCount;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    Books.push(newBook);

    const isSuccess = Books.filter((book) => book.id === id).length > 0;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    if (isSuccess) {
        const response = h.response({
            status: 'succes',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'gagal menambahkan books masukan input yang benar',
    });
    response.code(400);
    return response;
};

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        Books,
    },
});

const getBooksByIdHandler = (request, h) => {
    const { id } = request.params;

    const book = Books.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'succes',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBooksByIdHandler = (request, h) => {
    const { id } = request.params;

    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    const updatedAt = new Date().toISOString();
    const index = Books.findIndex((book) => book.id === id);

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    if (index !== -1) {
        Books[index] = {
            ...Books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        statuus: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deletBooksByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = Books.findIndex((book) => book.id === id);

    if (index !== -1) {
        Books.splice(index, 1);
        const response = h.response({
            status: 'succes',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addBooksHandler, getAllBooksHandler, getBooksByIdHandler, editBooksByIdHandler, deletBooksByIdHandler,
};