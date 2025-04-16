document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const salarioInput = document.getElementById('salario');
    const mesesInput = document.getElementById('meses');
    const avisoCheckbox = document.getElementById('aviso');
    const calcularBtn = document.getElementById('calcular');
    const resultadoDiv = document.getElementById('resultado');
    
    // Elementos de resultado
    const saldoSalarioEl = document.getElementById('saldoSalario');
    const decimoTerceiroEl = document.getElementById('decimoTerceiro');
    const feriasEl = document.getElementById('ferias');
    const tercoFeriasEl = document.getElementById('tercoFerias');
    const avisoValorEl = document.getElementById('aviso_valor');
    const fgtsDepositadoEl = document.getElementById('fgtsDepositado');
    const multaFGTSEl = document.getElementById('multaFGTS');
    const totalEl = document.getElementById('total');
    
    // Formatar entrada de salário
    salarioInput.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        valor = (parseFloat(valor) / 100).toFixed(2) + '';
        valor = valor.replace(".", ",");
        valor = valor.replace(/(\d)(\d{3})(\,)/g, "$1.$2$3");
        valor = valor.replace(/(\d)(\d{3})(\.\d{3})/g, "$1.$2$3");
        e.target.value = valor === '0,00' ? '' : 'R$ ' + valor;
    });
    
    // Formatar valor como moeda
    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }
    
    // Converter valor de moeda para número
    function converterMoedaParaNumero(valor) {
        return parseFloat(valor.replace(/\D/g, '')) / 100;
    }
    
    // Calcular verbas rescisórias
    calcularBtn.addEventListener('click', function() {
        // Obter e validar valores
        const salarioStr = salarioInput.value;
        const mesesStr = mesesInput.value;
        
        if (!salarioStr || !mesesStr) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        const salarioNum = converterMoedaParaNumero(salarioStr);
        const mesesNum = parseInt(mesesStr);
        const temAviso = avisoCheckbox.checked;
        
        // Cálculos
        const saldoSalario = salarioNum / 30 * 15; // Estimativa média de 15 dias
        const decimoTerceiro = (mesesNum / 12) * salarioNum;
        const ferias = (mesesNum / 12) * salarioNum;
        const tercoFerias = ferias / 3;
        const aviso = temAviso ? salarioNum : 0;
        const fgtsDepositado = 0.08 * salarioNum * mesesNum;
        const multaFGTS = fgtsDepositado * 0.4;
        
        const total = saldoSalario + decimoTerceiro + ferias + tercoFerias + aviso + multaFGTS;
        
        // Exibir resultados
        saldoSalarioEl.textContent = formatarMoeda(saldoSalario);
        decimoTerceiroEl.textContent = formatarMoeda(decimoTerceiro);
        feriasEl.textContent = formatarMoeda(ferias);
        tercoFeriasEl.textContent = formatarMoeda(tercoFerias);
        avisoValorEl.textContent = formatarMoeda(aviso);
        fgtsDepositadoEl.textContent = formatarMoeda(fgtsDepositado);
        multaFGTSEl.textContent = formatarMoeda(multaFGTS);
        totalEl.textContent = formatarMoeda(total);
        
        // Mostrar seção de resultados
        resultadoDiv.classList.remove('hidden');
    });
});
