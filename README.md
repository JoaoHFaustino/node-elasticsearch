# node-elasticsearch

## Descrição

Projeto com o objetivo de implementar alguns métodos de busca do ElasticSearch como também exlcuir e inserir dados. Por exemplo:
- `math:` Implementação de busca por texto;
- `range:` Implementação de busca que permitem filtrar documentos com base em intervalos de datas;
- `fuzziness:` Implementação de buscas que toleram erros de digitação;
- `minimum_should_match:` Parâmetro para o mínimo de correspondência aceita;

## Tecnologias Utilizadas
- Node.js
- TypeScript
- Elasticsearch
- Express

## Instalação

```bash
# Clone o repositório
git clone https://github.com/JoaoHFaustino/node-elasticsearch.git

# Entre no diretório do projeto
cd node-elasticsearch

# Instale as dependências
npm install
```

## Uso

```bash
# Suba o docker-compose
docker-compose up

# Inicie a aplicação
npm start
```
```sh
# Execute o curl para criar o índice no ElasticSearch
curl --location --request PUT 'http://localhost:9200/purchase_history' \
--header 'Content-Type: application/json' \
--data '{
    "mappings": {
        "properties": {
            "customer_id": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "items": {
                "type": "nested",
                "properties": {
                    "price_per_unit": {
                        "type": "float"
                    },
                    "product_id": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    },
                    "product_name": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    },
                    "quantity": {
                        "type": "long"
                    }
                }
            },
            "order_date": {
                "type": "date"
            },
            "order_id": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "shipping_address": {
                "properties": {
                    "address_line_1": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    },
                    "address_line_2": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    },
                    "city": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    },
                    "country": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    },
                    "state": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    },
                    "zip_code": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    }
                }
            },
            "status": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "total_amount": {
                "type": "float"
            }
        }
    }
}'
```
```sh
# curl para adicionar registros ao índice
curl --location 'http://localhost:3000/purchases' \
--header 'Content-Type: application/json' \
--data '{
    "orderId": "ORD001",
    "customerId": "CUST001",
    "orderDate": "2024-08-04T12:00:00Z",
    "totalAmount": 200.50,
    "items": [
        {
            "productId": "PROD004",
            "productName": "Tablet XYZ",
            "quantity": 1,
            "pricePerUnit": 200.00
        }
    ],
    "shippingAddress": {
        "addressLine1": "Av Paulista",
        "addressLine2": "",
        "city": "São Paulo",
        "state": "SP",
        "zipCode": "00000-000",
        "country": "Brasil"
    },
    "status": "Processing"
}'
```