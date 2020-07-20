'use strict'

/**
 * @api {post} /tools Criar Ferramenta
 * @apiName criar
 * @apiGroup /tools
 *
 * @apiExample {curl} Exemplo de uso:
 *     curl -v --header "Content-Type: application/json" \
 *     --X POST \
 *     --data '{"title":"Node JS", "description":"Node Javascript", "link":"http://localhost", "tags": ["node", "javascript"]}' \
 *     http://localhost:3000/tools
 *
 * @apiParam {json} tool Objeto que será salvo.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       'id': 1,
 *       'title': 'Node JS',
 *       'description': 'Node Javascript',
 *       'link': 'http://localhot',
 *       'tags': ['node', 'javascript']
 *     }
 */

/**
 * @api {delete} /tools/:id Delete Ferramenta
 * @apiName delete
 * @apiGroup /tools
 *
 * @apiExample {curl} Exemplo de uso:
 *     curl -v --header "Content-Type: application/json" \
 *     --X DELETE http://localhost:3000/tools/1
 *
 * @apiParam {json} tool Objeto que será salvo.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 */

/**
 * @api {get} /tools/:id Buscar Ferramenta Por ID
 * @apiName get-id
 * @apiGroup /tools
 *
 * @apiExample {curl} Exemplo de uso:
 *     curl -v --header "Content-Type: application/json" \
 *     --X GET http://localhost:3000/tools/1
 *
 * @apiParam {json} tool Objeto que será salvo.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'id': 1,
 *       'title': 'Node JS',
 *       'description': 'Node Javascript',
 *       'link': 'http://localhot',
 *       'tags': ['node', 'javascript']
 *     }
 */

/**
 * @api {get} /tools Buscar Todas Ferramentas
 * @apiName get-all
 * @apiGroup /tools
 *
 * @apiExample {curl} Exemplo de uso:
 *     curl -v --header "Content-Type: application/json" \
 *     --X GET http://localhost:3000/tools
 *
 * @apiParam {json} tool Objeto que será salvo.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       'id': 1,
 *       'title': 'Node JS',
 *       'description': 'Node Javascript',
 *       'link': 'http://localhot',
 *       'tags': ['node', 'javascript']
 *     }]
 */

/**
 * @api {get} /tools?tag=* Buscar Ferramentas Por Tag
 * @apiName get-tag
 * @apiGroup /tools
 *
 * @apiExample {curl} Exemplo de uso:
 *     curl -v --header "Content-Type: application/json" \
 *     --X GET http://localhost:3000/tools?tag=node
 *
 * @apiParam {json} tool Objeto que será salvo.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       'id': 1,
 *       'title': 'Node JS',
 *       'description': 'Node Javascript',
 *       'link': 'http://localhot',
 *       'tags': ['node', 'javascript']
 *     }]
 */

