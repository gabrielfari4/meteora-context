import { useContext, useEffect, useMemo } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";
import {
    ADD_PRODUTO,
    REMOVE_PRODUTO,
    UPDATE_QUANTIDADE,
} from "../reducers/carrinhoReducer";

const addProdutoAction = (novoProduto) => {
    return {
        type: ADD_PRODUTO,
        payload: novoProduto,
    };
};

const removeProdutoAction = (produtoId) => {
    return {
        type: REMOVE_PRODUTO,
        payload: produtoId,
    };
};

const updateQuantidadeAction = (produtoId, quantidade) => {
    return {
        type: UPDATE_QUANTIDADE,
        payload: { produtoId, quantidade },
    };
};

export const useCarrinhoContext = () => {
    const { carrinho, dispatch, quantidade, valorTotal } =
        useContext(CarrinhoContext);

    const adicionarProduto = (novoProduto) => {
        dispatch(addProdutoAction(novoProduto));
    };

    function removerProduto(id) {
        const produto = carrinho.find((item) => item.id === id);

        if (produto && produto.quantidade > 1) {
            dispatch(updateQuantidadeAction(id, produto.quantidade - 1));
        } else {
            dispatch(removeProdutoAction(id));
        }
    }

    const removerProdutoCarrinho = (id) => {
        dispatch(removeProdutoAction(id));
    };

    return {
        carrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho,
        valorTotal,
        quantidade,
    };
};
