import { getLogger } from "log4js";
import BaseController from "../abstracts/base.controller";
import ScrappingService from "../../services/scapping/scrapping.servive";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Response } from "express";

export default class MoviesController implements BaseController {

    private logger = getLogger('MoviesController');
    private scrappingService = new ScrappingService();

     /**
     * getMovies
     */
     public async getMovies(params: {theaterName: string, lang: string}, res: Response) : Promise<Response> {
       
        try {
            
            const movies = await this.scrappingService.movies(params.theaterName, params.lang);

            if (movies.length == 0) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: `${params.theaterName} was not found`,
                    errors : []
                })
            }

            return res.status(StatusCodes.OK).json(movies);

        } catch (error) {
           
            const e = error as Error;

            this.logger.warn('getMovies');
            this.logger.warn(e.message);

            return res.status(StatusCodes.BAD_REQUEST).json({
                message: ReasonPhrases.BAD_REQUEST,
                errors: e.message,
            })
        }
    }

      /**
     * getMovieInfoBySlug
     */
      public async getMovieInfoBySlug(params: {slug: string, lang: string}, res: Response) : Promise<Response> {
       
        try {
            
            const infos = await this.scrappingService.movieInfoBySlug(params.slug, params.lang,);
            
            return res.status(StatusCodes.OK).json(infos);

        } catch (error) {
           
            const e = error as Error;

            this.logger.warn('getMovieInfoBySlug');
            this.logger.warn(e.message);

            return res.status(StatusCodes.BAD_REQUEST).json({
                message: ReasonPhrases.BAD_REQUEST,
                errors: e.message,
            })
        }
    }

      /**
     * getMovieInfoBySlug
     */
      public async getMovieDiffusionInfos(params: {theater?: string, slug: string, lang: string}, res: Response) : Promise<Response> {
       
        try {
            
            const infos = await this.scrappingService.movieDiffusionInfos(params.slug, params.lang, params.theater);
            
            return res.status(StatusCodes.OK).json(infos);

        } catch (error) {
           
            const e = error as Error;

            this.logger.warn('getMovieDiffusionInfos');
            this.logger.warn(e.message);

            return res.status(StatusCodes.BAD_REQUEST).json({
                message: ReasonPhrases.BAD_REQUEST,
                errors: e.message,
            })
        }
      }

}