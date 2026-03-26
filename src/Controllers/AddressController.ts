import { type Request, type Response, type NextFunction } from "express";
import AddressService from "../Service/AddressService.js";
import { ApiException } from "../Exception/ApiException.js";

class AddressController {

    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const address = await AddressService.create(req.body);
            res.status(201).json(address);
        } catch (error) {
            next(error);
        }
    }

    static async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { page, size } = req.query;
            const result = await AddressService.findAll(
                Number(page) || 1,
                Number(size) || 10
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_address } = req.params;
            if (!id_address || Array.isArray(id_address)) {
                throw new ApiException("INVALID_ID", 400, "undefined");
            }

            const id: number = Number(id_address);
            if (Number.isNaN(id)) {
                throw new ApiException("INVALID_ID", 400, id_address);
            }

            const address = await AddressService.findById(id);
            if (!address) {
                throw new ApiException("ADDRESS_NOT_FOUND", 404, id);
            }
            res.status(200).json(address);
        } catch (error) {
            next(error);
        }
    }

    static async updateAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { id_address } = req.params;
            if (!id_address || Array.isArray(id_address)) {
                throw new ApiException("INVALID_ID", 400, "undefined");
            }

            const id: number = Number(id_address);
            if (Number.isNaN(id)) {
                throw new ApiException("INVALID_ID", 400, id_address);
            }

            await AddressService.updateAddress(id, req.body);

            res.status(200).json({
                message: "Endereço atualizado com sucesso"
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_address } = req.params;
            if (!id_address || Array.isArray(id_address)) {
                throw new ApiException("INVALID_ID", 400, "undefined");
            }

            const id: number = Number(id_address);
            if (Number.isNaN(id)) {
                throw new ApiException("INVALID_ID", 400, id_address);
            }

            await AddressService.delete(id);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

}

export default AddressController;