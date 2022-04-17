class CrudContainer {
    constructor (model) {
        this.model = model;
    };

    // crear nuevo objeto
    async save (object) {
        try {
            await this.model.create(object);
            return await this.getAll();
        }
        catch (error) {
            throw error;
        }
    };

    // breve explicación: según el id del objeto pasado por parámetro (object), se obtiene el objeto de la base de datos (toUpdate).
    // luego ese objeto (toUpdate) es actualizado mediante 'spread operator', con los datos del objeto pasado por param (object) y guardado en un nuevo objeto (updated).
    // ese objeto actualizado (updated) se guarda en la base de datos por su respectivo id.
    async update (object) {
        try {
            const toUpdate = await this.getById(object.id);
            const updated = {...toUpdate, ...object};
            return await this.model.update(updated, { where: { id: object.id }});
        }
        catch (error) {
            throw error;
        }
    }

    // obtener todos los objetos guardados
    async getAll () {
        try {
            return await this.model.findAll({});
        }
        catch (error) {
            throw error;
        }
    };

    // obtener objeto guardado por id
    async getById (id) {
        try {
            return await this.model.findOne({ where: { id: id }});
        }
        catch (error) {
            throw error;
        }
    };
    
    // borrar objeto por id
    async deleteById (id) {
        try {
            return await this.model.destroy({ where: { id: id }});
        }
        catch (error) {
            throw error;
        }
    };
};

module.exports = CrudContainer;