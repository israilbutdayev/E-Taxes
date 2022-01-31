// ==UserScript==
// @name         E-taxes
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  050 636 09 56
// @run-at       document-start
// @author       Israil Butdayev
// @match        https://qaime.e-taxes.gov.az/*
// @match        https://www.e-taxes.gov.az/vedop2/ebyn/dispatch*
// @updateURL    https://raw.githubusercontent.com/israilbutdayev/E-Taxes/main/E-taxes.meta.js
// @downloadURL  https://raw.githubusercontent.com/israilbutdayev/E-Taxes/main/E-taxes.main.js
// @icon         https://qaime.e-taxes.gov.az/assets/images/placeholder.jpg
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    window.addEventListener('load', async function() {
        if (window.location.href.includes('PG_QAIME_1')){
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/npm/handsontable@9.0/dist/handsontable.full.min.js'
            script.defer = true
            document.head.appendChild(script)
            const css = document.createElement('link')
            css.rel = 'stylesheet'
            css.type = 'text/css'
            css.href = 'https://cdn.jsdelivr.net/npm/handsontable@9.0/dist/handsontable.full.min.css'
            document.head.appendChild(css)
            const uploadButton = document.createElement('button');
            uploadButton.type = 'button'
            uploadButton.id = 'uploadToPage'
            uploadButton.className = 'btn btn-xs bg-teal-800 btn-labeled'
            uploadButton.style.marginLeft = '200px'
            { const b = document.createElement('b')
            const i = document.createElement('i');
             i.className = 'icon-arrow-down16';
             b.appendChild(i);
             uploadButton.appendChild(b)
             uploadButton.appendChild(document.createTextNode('E-qaiməyə əlavə etmək.'))
            }

            const firstPageButton = document.createElement('button');
            firstPageButton.type = 'button'
            firstPageButton.id = 'firstPage'
            firstPageButton.className = 'btn btn-xs bg-teal-800 btn-labeled'
            firstPageButton.style.marginLeft = '200px'
            { const b = document.createElement('b')
            const i = document.createElement('i');
             i.className = 'icon-arrow-left16';
             b.appendChild(i);
             firstPageButton.appendChild(b)
             firstPageButton.appendChild(document.createTextNode('Birinci səhifə'))
            }

            const secondPageButton = document.createElement('button');
            secondPageButton.type = 'button'
            secondPageButton.id = 'secondPage'
            secondPageButton.className = 'btn btn-xs bg-teal-800 btn-labeled'
            secondPageButton.style.marginLeft = '5px'
            { const b = document.createElement('b')
            const i = document.createElement('i');
             i.className = 'icon-arrow-right16';
             b.appendChild(i);
             secondPageButton.appendChild(b)
             const textNode = document.createTextNode('İkinci səhifə')
             secondPageButton.appendChild(textNode)
            }
            const docoid = sessionStorage.getItem("docoidToCopy")
            if(document.querySelector("#sidebarMenu > li.active > ul > li:nth-child(1) > a")){
                document.querySelector("#sidebarMenu > li.active > ul > li:nth-child(1) > a").addEventListener('click',()=>{sessionStorage.removeItem('docoidToCopy')})
            }
            window.addEventListener('beforeunload',e=>beforeUnload(e))
            function beforeUnload(e){
                if(!e.target.activeElement.href.includes('PG_QAIME_1')){
                    sessionStorage.removeItem('docoidToCopy')
                }
            }
            let hot;
            append();
            async function append(count=100){
                try{
                    firstPageButton.addEventListener('click',firstPageEvent);
                    uploadButton.addEventListener('click',uploadData);
                    secondPageButton.addEventListener('click',secondPageEvent);
                    firstPageEvent();
                    document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div:nth-child(1)").appendChild(uploadButton);
                    document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div:nth-child(1)").appendChild(firstPageButton);
                    document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div:nth-child(1)").appendChild(secondPageButton);
                    try {
                        if (docoid){copyDocument()}
                    } catch(error){
                        sessionStorage.removeItem('docoidToCopy')}
                } catch(error) {
                    //console.log(error)
                    if (count>0){
                        await new Promise((res,rej)=>{setTimeout(()=>{res()},100)})
                        append(count-1)
                    }
                }};
            async function copyDocument (){
                document.querySelector("#sidebarMenu a[href='/doFlow?doc=PG_QAIME_1']")?.addEventListener('click',()=>{sessionStorage.removeItem("docoidToCopy")})
                const html = await fetch("https://qaime.e-taxes.gov.az/service/eqaime.printQaime", {
                    "headers": {
                        "accept": "text/plain, */*; q=0.01",
                        "accept-language": "en-US,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": "docOidList%5B%5D=" + docoid,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then(response =>response.json())
                .then(response=>b64DecodeUnicode(response.htmlList[0]))
                .then(response=>new DOMParser().parseFromString(response,'text/html'))
                if (html.querySelector('body > p:nth-child(4) > span:nth-child(2)').textContent.substring(0,10)!==document.querySelector("#leftMenuOrgId").textContent && html.querySelector('body > p:nth-child(4) > span:nth-child(5)').textContent.substring(0,10)!==document.querySelector("#leftMenuOrgId").textContent){
                    sessionStorage.removeItem('docoidToCopy')
                    return ''
                }
                document.querySelector("#customerVoen").value = html.querySelector('body > p:nth-child(4) > span:nth-child(2)').textContent.substring(0,10)!==document.querySelector("#leftMenuOrgId").textContent?html.querySelector('body > p:nth-child(4) > span:nth-child(2)').textContent.substring(0,10):html.querySelector('body > p:nth-child(4) > span:nth-child(5)').textContent.substring(0,10)
                document.querySelector("#getCustomerVoen > i").click()
                document.querySelector("#customerNotes").textContent = html.querySelector('body > p:nth-child(4) > span:nth-child(8)').textContent
                document.querySelector("#customerNotes2").textContent = html.querySelector('body > p:nth-child(4) > span:nth-child(11)').textContent
                for (let i = 6; i <= html.querySelector('body > table > tbody').childNodes.length-2;i++){
                    let product = html.querySelector('body > table > tbody').childNodes[i]
                    document.querySelector("#addRow").click();
                    const lastChild = document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div.col-md-12.mt-20 > div > table > tbody").lastChild;
                    lastChild.children[2].querySelector('input').value = product.childNodes[1].textContent.substring(11,100)
                    lastChild.children[18].querySelector('input').value = product.childNodes[1].textContent.substring(0,10)
                    lastChild.children[3].querySelector('input').value = product.childNodes[2].textContent
                    lastChild.children[4].querySelector('input').value = product.childNodes[3].textContent
                    lastChild.children[5].querySelector('input').value = product.childNodes[4].textContent
                    lastChild.children[6].querySelector('input').value = product.childNodes[5].textContent
                    lastChild.children[7].querySelector('input').value = Round(Number(lastChild.children[5].querySelector('input').value)*Number(lastChild.children[6].querySelector('input').value),4);
                    lastChild.children[8].querySelector('input').value = product.childNodes[7].textContent
                    lastChild.children[9].querySelector('input').value = product.childNodes[8].textContent
                    lastChild.children[10].querySelector('input').value = lastChild.children[7].querySelector('input').value
                    lastChild.children[11].querySelector('input').value = Number(product.childNodes[11].textContent)>0?lastChild.children[7].querySelector('input').value:'0.00'
                    lastChild.children[12].querySelector('input').value = Number(product.childNodes[12].textContent)>0?lastChild.children[7].querySelector('input').value:'0.00'
                    lastChild.children[13].querySelector('input').value = Number(product.childNodes[13].textContent)>0?lastChild.children[7].querySelector('input').value:'0.00'
                    lastChild.children[14].querySelector('input').value = Number(product.childNodes[14].textContent)>0?lastChild.children[7].querySelector('input').value:'0.00'
                    lastChild.children[15].querySelector('input').value = Round(Number(lastChild.children[11].querySelector('input').value)*0.18,4)
                    lastChild.children[16].querySelector('input').value = product.childNodes[16].textContent
                    lastChild.children[17].querySelector('input').value = Round(Number(lastChild.children[7].querySelector('input').value)+Number(lastChild.children[15].querySelector('input').value),4)
                }
                document.querySelector("#totalAmount").value = roundToTwo(roundToFour(total6()));
                document.querySelector("#totalExcise").value = roundToTwo(roundToFour(total8()));
                document.querySelector("#totalVat").value = roundToTwo(roundToFour(total9()));
                document.querySelector("#totalVatIn").value = roundToTwo(roundToFour(total10()));
                document.querySelector("#totalVatOut").value = roundToTwo(roundToFour(total11()));
                document.querySelector("#totalVatFree").value = roundToTwo(roundToFour(total12()));
                document.querySelector("#totalVatZero").value = roundToTwo(roundToFour(total13()));
                document.querySelector("#totalPay").value = roundToTwo(roundToFour(total14()));
                document.querySelector("#totalRoad").value = roundToTwo(roundToFour(total15()));
                document.querySelector("#totalPrice").value = roundToTwo(roundToFour(total16()));
            }

            async function firstPageEvent(){
                if (document.querySelector('div#page2')){
                    document.querySelector('div#page2').style.display = 'none'
                }
                if (document.querySelector('div#page1')){
                    document.querySelector('div#page1').style.display = 'block'
                } else {
                    const div = document.createElement('div')
                    div.id = 'page1'
                    document.querySelector("#data_form > div:nth-child(9)")?.appendChild(div);
                    const container = document.querySelector('div#page1');
                    hot = new Handsontable(container, {
                        dataSchema: {defaultText:'18%',VATIncluded:'+'},
                        startCols:21,
                        startRows:10,
                        minRows:10,
                        //minSpareRows:1,
                        rowHeaders: true,
                        colWidths:[40,50,100,100,70,70,70,70,70,70,70,70,70,70,70,70,70,70,100],
                        autoWrapRow:true,
                        wordWrap:false,
                        autoWrapColumn:true,
                        autoWrapRow:true,
                        dropdownMenu: true,
                        filters: true,
                        manualColumnResize: true,
                        colHeaders: ['№','Seçim','1. Malın (işin, xidmətin) kodu','1. Malın (işin, xidmətin) adı','2. Barkod','3. Ölçü vahidi','4. Miqdarı, həcmi','5. Vahidin buraxılış qiyməti (manatla)','6. Cəmi (manatla) (4*5)','7. Aksiz Dərəcəsi (%)',
                                     '8. Aksiz Məbləği manatla','9. Cəmi (6+8)','10. ƏDV-yə cəlb edilən','11. ƏDV-yə cəlb edilməyən','12. ƏDV-dən azad olunan','13. ƏDV-yə 0 dərəcə ilə cəlb edilən','14. ƏDV məbləği manatla (10*0.18)','15. Yol Vergisi',
                                     '16. Yekun məbləğ (manatla) (9+14+15)','ƏDV dərəcəsi','Qiymətlərə ƏDV daxildir.'],
                        columns:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{type:'dropdown',data:'defaultText',source:['18%','','-','0']},{type:'dropdown',source:['+',''],data:'VATIncluded'}],
                        colHeight:'auto',
                        licenseKey: 'non-commercial-and-evaluation',
                    });

                }

            };
            async function secondPageEvent(){
                if (document.querySelector('div#page1')){
                    document.querySelector('div#page1').style.display = 'none'
                }
                if (document.querySelector('div#page2')){
                    document.querySelector('div#page2').style.display = 'block'
                } else {
                    const div = document.createElement('div')
                    div.id = 'page2'
                    document.querySelector("#data_form > div:nth-child(9)").appendChild(div);
                    const container = document.querySelector('div#page2');
                    Handsontable.renderers.registerRenderer('vatRenderer', vatRenderer);
                    hot = new Handsontable(container, {
                        dataSchema: {defaultText:'18%',VATIncluded:document.querySelector("#leftMenuOrgId").textContent==='1503047971'?'':'+'},
                        startCols:7,
                        startRows:10,
                        minRows:10,
                        //minSpareRows:1,
                        minColumns:7,
                        rowHeaders: true,
                        colWidths:[200,200,200,200,200,200,200,200],
                        autoWrapRow:true,
                        wordWrap:false,
                        autoWrapColumn:true,
                        autoWrapRow:true,
                        dropdownMenu: true,
                        filters: true,
                        manualColumnResize: true,
                        colHeaders: ['1. Malın (işin, xidmətin) kodu','2. Malın (işin, xidmətin) adı','3. Ölçü vahidi','4. Miqdarı, həcmi','5. Vahidin buraxılış qiyməti (manatla)','6. Cəmi (manatla) (4*5)','7. ƏDV dərəcəsi','8. Qiymətlərə ƏDV daxildir.'],
                        columns:[{},{},{},{},{},{},
                                 {
                                     type:'dropdown',
                                     data:'defaultText',
                                     //renderer:'vatRenderer',
                                     source:['18%','','-','0']
                                 },
                                 {type:'dropdown',source:['+',''],data:'VATIncluded'}
                                ],
                        colHeight:'auto',
                        licenseKey: 'non-commercial-and-evaluation',
                    });
                    function vatRenderer(hotInstance, td, row, column, prop, value, cellProperties){
                        Handsontable.renderers.BaseRenderer.apply(this, arguments);
                        if (!value){
                            //console.log(hotInstance, td, row, column, prop, value, cellProperties)
                            //td.textContent = '18%'
                            //td.childNodes[1].textContent = '18%'
                        }
                    };
                }
            }

            function uploadData(){
                if (document.querySelector('div#page1')?.style?.display!=='none'){
                    for (let i = 0;i<hot.countRows();i++){
                        if (hot.getDataAtCell(i,3)){
                            document.querySelector("#addRow").click();
                            const lastChild = document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div.col-md-12.mt-20 > div > table > tbody").lastChild;
                            lastChild.children[2].querySelector('input').value = hot.getDataAtCell(i,3)
                            lastChild.children[18].querySelector('input').value = hot.getDataAtCell(i,2)
                            lastChild.children[3].querySelector('input').value = hot.getDataAtCell(i,4)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[4].querySelector('input').value = hot.getDataAtCell(i,5)
                            lastChild.children[5].querySelector('input').value = hot.getDataAtCell(i,6)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[6].querySelector('input').value = hot.getDataAtCell(i,7)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[7].querySelector('input').value = hot.getDataAtCell(i,8)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[8].querySelector('input').value = hot.getDataAtCell(i,9)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[9].querySelector('input').value = hot.getDataAtCell(i,10)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[10].querySelector('input').value = hot.getDataAtCell(i,11)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[11].querySelector('input').value = hot.getDataAtCell(i,12)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[12].querySelector('input').value = hot.getDataAtCell(i,13)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[13].querySelector('input').value = hot.getDataAtCell(i,14)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[14].querySelector('input').value = hot.getDataAtCell(i,15)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[15].querySelector('input').value = hot.getDataAtCell(i,16)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[16].querySelector('input').value = hot.getDataAtCell(i,17)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[17].querySelector('input').value = hot.getDataAtCell(i,18)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                        }}
                } else if (document.querySelector('div#page2')?.style?.display!=='none'){
                    for (let i = 0;i<hot.countRows();i++){
                        if (hot.getDataAtCell(i,1)){
                            document.querySelector("#addRow").click();
                            const lastChild = document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div.col-md-12.mt-20 > div > table > tbody").lastChild;
                            if (hot.getDataAtCell(i,0)){
                                lastChild.children[18].querySelector('input').value = hot.getDataAtCell(i,0)
                            } else {
                                lastChild.children[18].querySelector('input').value = (document.querySelector("#leftMenuOrgId").textContent==='1503047971'?'9933111300':'9946382900')
                            }
                            lastChild.children[2].querySelector('input').value = hot.getDataAtCell(i,1)
                            lastChild.children[4].querySelector('input').value = hot.getDataAtCell(i,2)
                            lastChild.children[5].querySelector('input').value = hot.getDataAtCell(i,3)?.replace(/\s/g,'')?.replace(/\,/g,'.')
                            if (hot.getDataAtCell(i,6)?.includes('18%') && hot.getDataAtCell(i,7)?.includes('+')){
                                lastChild.children[6].querySelector('input').value = Round(Number(hot.getDataAtCell(i,4)?.replace(/\,/g,'.')?.replace(/\s/g,''))/(1+0.18),4)
                            } else {
                                lastChild.children[6].querySelector('input').value = Round(Number(hot.getDataAtCell(i,4)?.replace(/\,/g,'.')?.replace(/\s/g,'')),4)
                            }
                            lastChild.children[7].querySelector('input').value = Round(Number(lastChild.children[5].querySelector('input').value)*Number(lastChild.children[6].querySelector('input').value),4);
                            lastChild.children[8].querySelector('input').value = '0.00'
                            lastChild.children[9].querySelector('input').value = '0.00'
                            lastChild.children[10].querySelector('input').value = lastChild.children[7].querySelector('input').value
                            if (hot.getDataAtCell(i,6)?.includes('18%')){
                                lastChild.children[11].querySelector('input').value = lastChild.children[10].querySelector('input').value
                            } else if(hot.getDataAtCell(i,6)?.includes('0')) {
                                lastChild.children[14].querySelector('input').value = lastChild.children[10].querySelector('input').value
                            } else if(hot.getDataAtCell(i,6)?.includes('-')) {
                                lastChild.children[12].querySelector('input').value = lastChild.children[10].querySelector('input').value
                            } else {
                                lastChild.children[13].querySelector('input').value = lastChild.children[10].querySelector('input').value
                            }
                            lastChild.children[15].querySelector('input').value = Round(Number(lastChild.children[11].querySelector('input').value)*0.18,4)
                            lastChild.children[16].querySelector('input').value = 0
                            lastChild.children[17].querySelector('input').value = Round(Number(lastChild.children[7].querySelector('input').value)+Number(lastChild.children[15].querySelector('input').value),4)
                        }}
                }
                document.querySelector("#totalAmount").value = roundToTwo(roundToFour(total6()));
                document.querySelector("#totalExcise").value = roundToTwo(roundToFour(total8()));
                document.querySelector("#totalVat").value = roundToTwo(roundToFour(total9()));
                document.querySelector("#totalVatIn").value = roundToTwo(roundToFour(total10()));
                document.querySelector("#totalVatOut").value = roundToTwo(roundToFour(total11()));
                document.querySelector("#totalVatFree").value = roundToTwo(roundToFour(total12()));
                document.querySelector("#totalVatZero").value = roundToTwo(roundToFour(total13()));
                document.querySelector("#totalPay").value = roundToTwo(roundToFour(total14()));
                document.querySelector("#totalRoad").value = roundToTwo(roundToFour(total15()));
                document.querySelector("#totalPrice").value = roundToTwo(roundToFour(total16()));

            }

            const observer = new MutationObserver(observerFunction)
            function observerFunction(mutations){
                for (const mutation of mutations){
                    for (const addedNode of mutation.addedNodes){
                        if (addedNode.id==='btnRegister'){
                            try{
                                //console.log(document.querySelector("#data_form > div:nth-child(9)"));
                                document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div:nth-child(1)").removeChild(firstPageButton);
                                document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div:nth-child(1)").removeChild(uploadButton);
                                document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div:nth-child(1)").removeChild(secondPageButton);
                                document.querySelector("#data_form > div:nth-child(9)").removeChild(document.querySelector('#page1'));
                                document.querySelector("#data_form > div:nth-child(9)").removeChild(document.querySelector('#page2'));
                                //console.log(document.querySelector("#data_form > div:nth-child(9)"));
                            } catch {}
                        }

                    }
                }
            }

            const options = {attributes:true,characterData:true,childList:true,subtree:true}
            observer.observe(document.querySelector("#regContent"),options)
        }
        if (['getDocList','getAllDocList','getDrafts'].some(x=>window.location.href.includes(x))){
            {
                const script = document.createElement('script')
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js'
                script.defer = true
                document.head.appendChild(script)
            }
            const printButton = document.createElement('button');
            printButton.type = 'button';
            printButton.style.borderRadies = '3px';
            printButton.style.marginRight = '10px';
            //printButton.textContent = 'Cədvələ çıxart';
            printButton.id = 'printList';
            printButton.className = 'btn btn-xs bg-teal-800 pull-right';
            if (sessionStorage.getItem("docoidToCopy")){sessionStorage.removeItem("docoidToCopy")}

            {
                const i = document.createElement('i');
                i.className = 'icon-table2 position-left';
                printButton.appendChild(i)
                printButton.appendChild(document.createTextNode('Cədvələ çıxart'))
            }

            const showInfoButton = document.createElement('button')
            showInfoButton.type = 'button'
            showInfoButton.className = 'btn btn-xs bg-teal-800 pull-right'
            showInfoButton.id = 'userChecker'
            showInfoButton.style.marginRight = '10px'
            showInfoButton.checked = false;
            showInfoButton.addEventListener('click',(e)=>toggleCheckbox(e.target))
            const checkbox = document.createElement('i');
            checkbox.className = 'icon-minus3 position-left';
            showInfoButton.appendChild(checkbox)
            showInfoButton.appendChild(document.createTextNode('Qaimənin məlumatlarını göstər.'))
            checkbox.addEventListener('click',(e)=>toggleCheckbox(showInfoButton))
            const observer = new MutationObserver(mutations=>updateTable(mutations))
            const options = {attributes:true,characterData:true,childList:true,subtree:true}
            observer.observe(document.querySelector("body > div.page-container"),options)
            addCopyOp()
            function updateTable(mutations){
                for (let mutation of mutations){
                    if(mutation?.target?.querySelector('div.table-responsive')){
                        try{
                            addCopyOp()
                        } catch(error){
                            //console.log(error)
                        }
                    }
                }
            }
            async function copyDocument(e){
                const row = e.target.parentNode.parentNode.parentNode.parentNode.parentNode
                sessionStorage.setItem("docoidToCopy", row.dataset.docoid)
                //window.location = 'https://qaime.e-taxes.gov.az/doFlow?doc=PG_QAIME_1'
                window.open('https://qaime.e-taxes.gov.az/doFlow?doc=PG_QAIME_1')
            }

            function addCopyOp(){
                let children = document.querySelector("#default-datatable > tbody")?.children
                for(let i = 0;i<children?.length;i++){
                    const child = children[i]
                    let button = child.querySelector('button.chooseOperation')
                    const ul = child.querySelector('ul.dropdown-menu')
                    if (button){
                        const observer = new MutationObserver(observerFunction)
                        function observerFunction(mutations){
                            for (const mutation of mutations){
                                if (mutation.target.className ==='doOperation' && !mutation.target?.parentNode?.parentNode?.querySelector('li a.doCopy')){
                                    try{
                                        const li = document.createElement('li')
                                        const a = document.createElement('a')
                                        a.className = 'doCopy'
                                        //a.href = ''
                                        a.dataset.size = 'large'
                                        a.textContent = 'Sənədi Kopyala'
                                        li.appendChild(a)
                                        ul.appendChild(li)
                                        a.addEventListener('click',e=>copyDocument(e))
                                    } catch {}
                                }
                            }
                        }

                        const options = {attributes:true,characterData:true,childList:true,subtree:true}
                        observer.observe(ul,options)
                    } else {
                        button = document.createElement('button')
                        button.type = 'button'
                        button.className = 'btn bg-teal-800 dropdown-toggle copyDocument'
                        button.dataset.toggle = 'dropdown'
                        button.ariaHasPopup = 'true'
                        button.ariaExpanded = 'false'
                        {const span = document.createElement('span')
                        span.dataset.land = 'tabs.chooseOperation'
                         span.textContent = 'Əməliyyatı seçin'
                         button.appendChild(span)}
                        {const span = document.createElement('span')
                        span.className = 'caret'
                         button.appendChild(span)
                         const li = document.createElement('li')
                         const a = document.createElement('a')
                         a.className = 'doCopy'
                         //a.href = ''
                         a.dataset.size = 'large'
                         a.textContent = 'Sənədi Kopyala'
                         li.appendChild(a)
                         ul.appendChild(li)
                         a.addEventListener('click',e=>copyDocument(e))
                        }
                        button.addEventListener('click',()=>{
                            if (button.ariaExpanded==='true'){
                                button.ariaExpanded = 'false'
                                ul.style.display = 'none'
                            } else {
                                button.ariaExpanded = 'true'
                                ul.style.display = 'block'}
                        })

                        child.querySelector('div.btn-group').insertBefore(button,child.querySelector('ul.dropdown-menu'))
                    }

                }
            }
            function toggleCheckbox (target){
                if (target.checked){
                    target.checked = false;
                    checkbox.className = 'icon-minus3 position-left'
                } else {
                    target.checked = true;
                    checkbox.className = 'icon-plus3 position-left'
                }
            }
            async function append(count=1000){
                try{
                    document.querySelector("#filterButton").parentElement.appendChild(printButton)
                    printButton.addEventListener('click',printList)
                    document.querySelector("#filterButton").parentElement.appendChild(showInfoButton);
                    const date = new Date()
                    const table = document.querySelector("#default-datatable")
                    document.querySelector("#startDate").value = new Date(date.getFullYear(),date.getMonth(),1,0,0).toLocaleDateString("ru") + ' 00:00'
                } catch {
                    if (count>0){
                        await new Promise((res,rej)=>{setTimeout(()=>{res()},100)})
                        append(count-1)
                    }
                }}
            append();


        } else if (window.location.href.includes('PG_REFUND')) {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/npm/handsontable@9.0/dist/handsontable.full.min.js'
            script.defer = true
            document.head.appendChild(script)
            const css = document.createElement('link')
            css.rel = 'stylesheet'
            css.type = 'text/css'
            css.href = 'https://cdn.jsdelivr.net/npm/handsontable@9.0/dist/handsontable.full.min.css'
            document.head.appendChild(css)
            const div = document.createElement('div')
            div.id = 'refund'
            div.className = 'col-md-12'
            const uploadButton = document.createElement('button');
            uploadButton.type = 'button'
            uploadButton.id = 'uploadToPage'
            uploadButton.className = 'btn btn-xs bg-teal-800 btn-labeled'
            uploadButton.style.margin = '15px 50% 10px 45%'
            const b = document.createElement('b')
            const i = document.createElement('i');
            i.className = 'icon-arrow-down16';
            b.appendChild(i);
            uploadButton.appendChild(b)
            uploadButton.appendChild(document.createTextNode('Əvəzləşməyə əlavə etmək.'))
            const selectAllButton = document.createElement('button')
            selectAllButton.type = 'button'
            selectAllButton.id = 'selectAll'
            selectAllButton.className = 'btn btn-xs bg-teal-800 btn-labeled'
            {
                const b = document.createElement('b')
                const i = document.createElement('i');
                i.className = 'icon-stack-check';
                b.appendChild(i);
                selectAllButton.appendChild(b)
                selectAllButton.appendChild(document.createTextNode('Hamısını seçmək'))
            }
            selectAllButton.addEventListener('click',e=>toggle(e))
            let hot;
            append();
            async function append(count=1000){
                try{
                    Handsontable;
                    for (let i = 0;i<=3;i++){
                        const cloneNode = document.querySelector("#data_form > div:nth-child(1) > div > div.panel-body").children[i].cloneNode(true)
                        for (let prop of ['id']){
                            for (let child of ['input','select','button']){
                                try{
                                    cloneNode.querySelector(child)[prop] +='-2'
                                } catch(error){
                                }
                            }
                        }

                        document.querySelector("#data_form > div:nth-child(1) > div > div.panel-body").appendChild(cloneNode)
                    }
                    document.querySelector("#packageType2").disabled = false
                    document.querySelector("#packageType2-2").disabled = false
                    document.querySelector("#year").value = new Date().getFullYear()
                    document.querySelector("#year-2").value = new Date().getFullYear()
                    for (let id of ['packageType2','packageType2-2']){
                        const options = document.querySelector(`#${id}`).options;
                        [...options].forEach(x=>x.parentElement.removeChild(x))
                        document.querySelector("[id='packageType2-2']").disabled = false
                        options[0] = new Option('Yanvar','01')
                        options[1] = new Option('Fevral','02')
                        options[2] = new Option('Mart','03')
                        options[3] = new Option('Aprel','04')
                        options[4] = new Option('May','05')
                        options[5] = new Option('İyun','06')
                        options[6] = new Option('İyul','07')
                        options[7] = new Option('Avqust','08')
                        options[8] = new Option('Sentyabr','09')
                        options[9] = new Option('Oktyabr','10')
                        options[10] = new Option('Noyabr','11')
                        options[11] = new Option('Dekabr','12')}
                    document.querySelector("#packageType").value = '01'
                    document.querySelector("#packageType-2").value = '01'
                    document.querySelector("[id='packageType2']").value = '01'
                    document.querySelector("[id='packageType2-2']").value = '12'
                    document.querySelector("[id='packageType-2']").addEventListener('change',(e)=>{
                        const options = document.querySelector("[id='packageType2-2']").options
                        if (e.target.value==='0'){
                            [...options].forEach(x=>x.parentElement.removeChild(x))
                            options[0] = new Option('Seçin','0')
                            document.querySelector("[id='packageType2-2']").disabled = true
                            document.querySelector("[id='packageType2-2']").value = '0'
                        }
                        else if (e.target.value==='01'){
                            [...options].forEach(x=>x.parentElement.removeChild(x))
                            document.querySelector("[id='packageType2-2']").disabled = false
                            options[0] = new Option('Yanvar','01')
                            options[1] = new Option('Fevral','02')
                            options[2] = new Option('Mart','03')
                            options[3] = new Option('Aprel','04')
                            options[4] = new Option('May','05')
                            options[5] = new Option('İyun','06')
                            options[6] = new Option('İyul','07')
                            options[7] = new Option('Avqust','08')
                            options[8] = new Option('Sentyabr','09')
                            options[9] = new Option('Oktyabr','10')
                            options[10] = new Option('Noyabr','11')
                            options[11] = new Option('Dekabr','12')
                            document.querySelector("[id='packageType2-2']").value = '12'

                        }
                        else if (e.target.value==='02'){
                            [...options].forEach(x=>x.parentElement.removeChild(x))
                            document.querySelector("[id='packageType2-2']").disabled = false
                            for (let i = 0;i<=3;i++){
                                options[i] = new Option(i+1,('0'+(i*3+1)).substr(('0'+(i*3+1)).length-2,2))}
                            document.querySelector("[id='packageType2-2']").value = '10'
                        }
                    })
                    document.querySelector("[id='filterButton-2']").textContent = 'Çap et'
                    document.querySelector("[id='filterButton-2']").addEventListener('click',refundList)
                    document.querySelector("#data_form > div:nth-child(2)").appendChild(div)
                    document.querySelector("#data_form > div:nth-child(2)").appendChild(uploadButton)
                    document.querySelector("#data_form > div:nth-child(3) > div > div.panel-body > div:nth-child(1)").appendChild(selectAllButton)
                    hot = new Handsontable(div, {
                        dataSchema: {rowNo:'308'},
                        startCols:6,
                        startRows:10,
                        minRows:5,
                        //minSpareRows:1,
                        rowHeaders: true,
                        colWidths:[100,100,100,100,100,100,1000],
                        autoWrapRow:true,
                        wordWrap:false,
                        autoWrapColumn:true,
                        autoWrapRow:true,
                        dropdownMenu: true,
                        filters: true,
                        manualColumnResize: true,
                        colHeaders: ['№','Sətir Nömrəsi','Qaimənin Seriyası','Qaimənin Nömrəsi','Ödənilmiş ümumi dəyər','Ödənilmiş ƏDV','Nəticə',],
                        columns:[{},{type:'dropdown',data:'rowNo',source:['308','314','316',]},{},{},{},{},{
                            readOnly:true,
                        },],
                        colHeight:'auto',
                        licenseKey: 'non-commercial-and-evaluation',
                    });
                    uploadButton.addEventListener('click',uploadData);
                } catch(error) {
                    //console.log(error)
                    if (count>0){
                        await new Promise((res,rej)=>{setTimeout(()=>{res()},100)})
                        append(count-1)
                    }
                }}
            async function uploadData(){
                const year = document.querySelector("#year").value
                const month = document.querySelector("#packageType2").value;
                //document.querySelector("#filterButton").click();
                for (let i = 0;i<hot.countRows();i++){
                    const rowNo = hot.getSourceDataAtCell(i,1)?.replace(/\s/g,'')
                    const ser = hot.getSourceDataAtCell(i,2)?.replace(/\s/g,'')
                    const No = ('000000'+hot.getSourceDataAtCell(i,3))?.slice(-6).replace(/\s/g,'')
                    const amount = hot.getSourceDataAtCell(i,4)?.replace(/\,/g,'.').replace(/\s/g,'')
                    const vat = Round(Number(amount)*0.18,2)
                    if (!ser || !No){
                        continue;
                    }
                    if (ser.length!==4){
                        hot.setDataAtCell(i,6, 'Qaimənin Seriyası düzgün deyil');
                        continue;
                    }
                    const data = `qaimeSeria=${ser}&qaimeNumber=${No}`
                    fetch("https://qaime.e-taxes.gov.az/service/eqaime.getEqaimeAmounts", {
                        "headers": {
                            "accept": "text/plain, */*; q=0.01",
                            "accept-language": "en-US,en;q=0.9",
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest"
                        },
                        "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": data,
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }).then(response=>response.json())
                        .then(response=>{
                        if (response.response.code==='1114'){
                            hot.setDataAtCell(i, 6, response.response.message);
                            return;
                        }
                        const qaimeOid = response.qaimeOid
                        const data = `qaimeOid=${qaimeOid}&vhfSeria=${ser}&vhfNum=${No}&odenilmishEdv=${vat}&odenilmishEdvsiz=${amount}&setirKodu=${rowNo}&year=${year}&type=01&month=${month}`
                        fetch("https://qaime.e-taxes.gov.az/service/eqaime.saveRefundInfo", {
                            "headers": {
                                "accept": "text/plain, */*; q=0.01",
                                "accept-language": "en-US,en;q=0.9",
                                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "x-requested-with": "XMLHttpRequest"
                            },
                            "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                            "referrerPolicy": "strict-origin-when-cross-origin",
                            "body": data,
                            "method": "POST",
                            "mode": "cors",
                            "credentials": "include"
                        }).then(response=>response.json())
                            .then(response=>{
                            if (response.response.message.includes('Qeyd edilən e-qaimə faktura əvəzləşəcəklər siyahısında var.')){
                                const data = `year=${year}&type=01&vhfSeria=${ser}&month=${month}&vhfNum=${No}`
                                fetch("https://qaime.e-taxes.gov.az/service/eqaime.getRefundedList", {
                                    "headers": {
                                        "accept": "text/plain, */*; q=0.01",
                                        "accept-language": "en-US,en;q=0.9",
                                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                        "sec-ch-ua-mobile": "?0",
                                        "sec-fetch-dest": "empty",
                                        "sec-fetch-mode": "cors",
                                        "sec-fetch-site": "same-origin",
                                        "x-requested-with": "XMLHttpRequest"
                                    },
                                    "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                                    "referrerPolicy": "strict-origin-when-cross-origin",
                                    "body": data,
                                    "method": "POST",
                                    "mode": "cors",
                                    "credentials": "include"
                                }).then(response=>response.json())
                                    .then(response=>{
                                    const detailOid = response.refundListDTO[0].detailOid
                                    if (Number(amount)>Number(response.refundListDTO[0].umumiEdvsiz)){
                                        hot.setDataAtCell(i, 6, `${response.refundListDTO[0].umumiEdvsiz}. Sətir kodu 308 və 314 seçildikdə Ödənilmiş ümumi dəyər qaimədə ƏDV-yə cəlb edilən dəyərdən çox ola bilməz ${ser} ${No} (ödənilmiş dəyər ${amount}, ƏDV-yə cəlb edilən dəyəri ${response.refundListDTO[0].umumiEdvsiz})`)
                                    } else if(Number(response.refundListDTO[0].odenilmisEdvsiz)!==Number(amount)){
                                        fetch("https://qaime.e-taxes.gov.az/service/eqaime.deleteRefundInfo", {
                                            "headers": {
                                                "accept": "text/plain, */*; q=0.01",
                                                "accept-language": "en-US,en;q=0.9",
                                                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                                "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                                "sec-ch-ua-mobile": "?0",
                                                "sec-fetch-dest": "empty",
                                                "sec-fetch-mode": "cors",
                                                "sec-fetch-site": "same-origin",
                                                "x-requested-with": "XMLHttpRequest"
                                            },
                                            "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                                            "referrerPolicy": "strict-origin-when-cross-origin",
                                            "body": `evezDetailOid%5B%5D=${detailOid}`,
                                            "method": "POST",
                                            "mode": "cors",
                                            "credentials": "include"
                                        }).then(()=>{
                                            const data = `qaimeOid=${qaimeOid}&vhfSeria=${ser}&vhfNum=${No}&odenilmishEdv=${vat}&odenilmishEdvsiz=${amount}&setirKodu=${rowNo}&year=${year}&type=01&month=${month}`
                                            fetch("https://qaime.e-taxes.gov.az/service/eqaime.saveRefundInfo", {
                                                "headers": {
                                                    "accept": "text/plain, */*; q=0.01",
                                                    "accept-language": "en-US,en;q=0.9",
                                                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                                    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                                    "sec-ch-ua-mobile": "?0",
                                                    "sec-fetch-dest": "empty",
                                                    "sec-fetch-mode": "cors",
                                                    "sec-fetch-site": "same-origin",
                                                    "x-requested-with": "XMLHttpRequest"
                                                },
                                                "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                                                "referrerPolicy": "strict-origin-when-cross-origin",
                                                "body": data,
                                                "method": "POST",
                                                "mode": "cors",
                                                "credentials": "include"
                                            }).then(response=>response.json())
                                                .then(response=>{
                                                if (response.response.code==='1114'){
                                                    hot.setDataAtCell(i, 6, response.response.message)
                                                } else if(response.response.code==='0'){
                                                    hot.setDataAtCell(i, 6, 'Yazıldı')
                                                }
                                            })
                                        })
                                    } else {
                                        hot.setDataAtCell(i, 6, 'Əvəzləşmə artıq yazılıb!')
                                    }
                                })
                            }else if (response.response.code==='1114'){
                                if(response.response.message.includes('ƏDV-yə cəlb edilən dəyəri')){
                                    hot.setDataAtCell(i, 6, `${response.response.message.match(/ƏDV-yə cəlb edilən dəyəri (.*)\)/)[1]}. Sətir kodu 308 və 314 seçildikdə Ödənilmiş ümumi dəyər qaimədə ƏDV-yə cəlb edilən dəyərdən çox ola bilməz ${ser} ${No} (ödənilmiş dəyər ${amount}, ƏDV-yə cəlb edilən dəyəri ${response.response.message.match(/ƏDV-yə cəlb edilən dəyəri (.*)\)/)[1]})`)
                                } else {
                                    hot.setDataAtCell(i, 6, response.response.message)}
                            } else if(response.response.code==='0'){
                                hot.setDataAtCell(i, 6, 'Yazıldı')
                            }
                        })

                    })
                    if (!hot.countRows()%10){
                        //document.querySelector("#filterButton").click();
                    }
                };
                //document.querySelector("#filterButton").click()
            }

            async function toggle(e){
                if (!e.target?.isChecked){
                    const rows = document.querySelector("#tableStriped2 > tbody").childNodes
                    for (let i = 0; i<rows.length;i++){
                        const row = rows[i]
                        row.childNodes[1].childNodes[0].childNodes[0].className = 'checked'
                        row.childNodes[1].childNodes[0].childNodes[0].childNodes[0].checked = true
                    }
                    e.target.isChecked = true
                } else {
                    const rows = document.querySelector("#tableStriped2 > tbody").childNodes
                    for (let i = 0; i<rows.length;i++){
                        const row = rows[i]
                        row.childNodes[1].childNodes[0].childNodes[0].className = ''
                        row.childNodes[1].childNodes[0].childNodes[0].childNodes[0].checked = false
                    }
                    e.target.isChecked = false
                }
            }

        } else if (window.location.href.includes('https://www.e-taxes.gov.az/vedop2/ebyn/dispatch')){
            function stringToDate(title,toString=false) {
                const [_, day, month, year, hour, minute, second] = title.match(
                    /(\d{2})\.(\d{2})\.(\d{4})[\s-]*(\d{2}):(\d{2}):(\d{2})/
                );
                if (!toString){
                    return new Date(year, month - 1, day, hour, minute, second).getTime();
                } else {
                    return new Date(year, month - 1, day, hour, minute, second).toLocaleDateString("ru");
                }
            }
            if (document.querySelector('#edhOperationAmount')){
                const script = document.createElement('script')
                script.src = 'https://cdn.jsdelivr.net/npm/handsontable@9.0/dist/handsontable.full.min.js'
                script.defer = true
                document.head.appendChild(script)
                const css = document.createElement('link')
                css.rel = 'stylesheet'
                css.type = 'text/css'
                css.href = 'https://cdn.jsdelivr.net/npm/handsontable@9.0/dist/handsontable.full.min.css'
                document.head.appendChild(css)
                const uploadButton = document.createElement('button');
                uploadButton.type = 'button'
                uploadButton.id = 'upload'
                uploadButton.className = ''
                uploadButton.style.marginLeft = '200px'
                uploadButton.style.marginTop = '20px'
                uploadButton.textContent = 'İmzalanacaq sənədlər qovluğuna göndər'
                const div = document.createElement('div')
                div.style.display = 'flex';
                div.style.alignItems = 'center';
                div.style.flexDirection = 'column';
                const container = document.createElement('div')
                container.id = 'container'
                div.appendChild(container)
                div.appendChild(uploadButton);
                uploadButton.addEventListener('click',handler)
                let hot;
                append()
                async function append(count=1000){
                    try{
                        Handsontable
                        document.body.appendChild(div);
                        hot = new Handsontable(container, {
                            startCols:5,
                            startRows:10,
                            minRows:5,
                            //minSpareRows:1,
                            rowHeaders: true,
                            colWidths:[100,100,100,500,200],
                            autoWrapRow:true,
                            wordWrap:false,
                            autoWrapColumn:true,
                            autoWrapRow:true,
                            dropdownMenu: true,
                            filters: true,
                            colHeaders: ['№','VÖEN','Məbləğ','Təyinat','Nəticə',],
                            manualColumnResize: true,
                            colHeight:'auto',
                            licenseKey: 'non-commercial-and-evaluation',
                        });
                        //document.querySelector("#type-b").appendChild(div);
                    } catch(error) {
                        //console.log(error)
                        if (count>0){
                            await new Promise((res,rej)=>{setTimeout(()=>{res()},100)})
                            append(count-1)
                        }
                    }}


                async function handler (){
                    const payments = []
                    for (let i = 0;i<hot.countRows();i++){
                        if (!hot.getSourceDataAtCell(i,1)) {
                            continue}
                        const taxId = hot.getSourceDataAtCell(i,1).replace(/\s/g,'')
                        const amount = hot.getSourceDataAtCell(i,2).replace(/\,/g,'.').replace(/\s/g,'')
                        const description = hot.getSourceDataAtCell(i,3)
                        payments.push({taxId, amount, description})
                    }

                    const token = document.querySelector("#MTOKEN").value

                    const doc = new DOMParser().parseFromString(await fetch("https://www.e-taxes.gov.az/vedop2/ebyn/dispatch", {
                        "headers": {
                            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                            "cache-control": "max-age=0",
                            "content-type": "application/x-www-form-urlencoded",
                            "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-fetch-dest": "document",
                            "sec-fetch-mode": "navigate",
                            "sec-fetch-site": "same-origin",
                            "sec-fetch-user": "?1",
                            "upgrade-insecure-requests": "1"
                        },
                        "body": `cmd=EDVINSERTJSPSRV&TOKEN=${token}`,
                        'method':'POST',
                    }).then(response=>response.text()),'text/html')


                    const taxId = doc.querySelector("#edv > table > tbody > tr:nth-child(1) > td > table:nth-child(3) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td:nth-child(1)").innerText
                    const taxName = doc.querySelector("#edv > table > tbody > tr:nth-child(1) > td > table:nth-child(3) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td:nth-child(2)").innerText
                    const totalAmount = doc.querySelector("#edv > table > tbody > tr:nth-child(1) > td > table:nth-child(3) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td:nth-child(3)").innerText

                    for (let i = 0;i<payments.length;i++){
                        const payment= payments[i]
                        if (Number(payment.amount)>Number(totalAmount)){
                            hot.setDataAtCell(i, 4, 'Ödənilən məbləğ, sub uçot hesabının qalığından çox ola bilməz !!!')
                            continue
                        }

                        fetch("https://www.e-taxes.gov.az/vedop2/ebyn/dispatch", {
                            "headers": {
                                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                                "cache-control": "max-age=0",
                                "content-type": "application/x-www-form-urlencoded",
                                "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-fetch-dest": "document",
                                "sec-fetch-mode": "navigate",
                                "sec-fetch-site": "same-origin",
                                "sec-fetch-user": "?1",
                                "upgrade-insecure-requests": "1"
                            },
                            "method":"POST",
                            "referrer": "https://www.e-taxes.gov.az/vedop2/ebyn/dispatch",
                            "referrerPolicy": "strict-origin-when-cross-origin",
                            "body": `TOKEN=${token}&cmd=EDV_SAVE_AS_WAITING_OPERATION_SRV&grupSayi=0&signedFilePath=&ok=0&edhOperationDebVoenOid=${taxId}&bildirishNo=&edhOperationDebVoenName=${taxName}&waitingOperationOid=null&waitingOperationOidS=&totalAmount=${totalAmount}&specialAccount=0&specialAccount=0&specialAmount=0&waitingOperationOid_1=&operationType=1&edhOperationCrdVoenOid=${payment.taxId}&edhOperationAmount=${payment.amount}&hdnInvCount=0&OperationTeyinat=${encodeURI(payment.description)}&daxilol=1&yxoCode=&treasureCode=0900111111`,
                        }
                             );
                        hot.setDataAtCell(i, 4, 'Yazıldı.')
                    }

                }}

            if (document.querySelector('[name="beyannameList"]')) {

                let children = document.querySelector(
                    '#type-b > table:nth-child(3) > tbody > tr:nth-child(4) > td > form > center > table > tbody'
                ).children;
                if (children.length > 0) {
                    function sorting(i = 0) {
                        let nodes = [...children].slice(3, children.length);
                        if (stringToDate(nodes[i].title) < stringToDate(nodes[i + 1].title)) {
                            nodes[i + 1].after(nodes[i]);
                            sorting(i > 0 ? i - 1 : i);
                        } else if (i < nodes.length - 2) {
                            sorting(i + 1);
                        }
                    }
                    sorting();
                }
            }


            if (document.querySelector("[name='packageSearch']")) {
                async function append(count=1000){
                    try{
                        const script = document.createElement('script')
                        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.6.0/jszip.js'
                        script.defer = true
                        document.head.appendChild(script);
                        {
                            const script = document.createElement('script')
                            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js'
                            script.defer = true
                            document.head.appendChild(script)
                        }
                        const btn = document.createElement('input');
                        btn.type = 'button';
                        btn.value = 'Download All';
                        btn.style.fontSize = '16px';
                        document.querySelector('#bodyDiv').appendChild(btn);
                        btn.addEventListener('click',downloadAll);
                        document.querySelector("[name='beyannameTanim']").value = 'VAT'
                        document.querySelector("[name='durum'][value='4']").checked = true
                        document.querySelector("[name='donemBasYil']").value = document.querySelector("[name='donemBasYil']").options[document.querySelector("[name='donemBasYil']").options.length-1].value
                        document.querySelector("[name='donemBitAy']").value = new Date().getMonth()+1
                        document.querySelector("[name='donemBitYil']").value = document.querySelector("[name='donemBitYil']").options[document.querySelector("[name='donemBitYil']").options.length-1].value
                        document.querySelector('[name="sorguTipiB"]').checked = true;
                        document.querySelector('[name="sorguTipiP"]').checked = true;
                        document.querySelector('[name="sorguTipiD"]').checked = true;
                        const label = document.createElement('label')
                        label.id = 'Checker'
                        label.style.fontSize = '14px'
                        const labelText = document.createTextNode('text')
                        labelText.textContent = 'Bir paketdə yüklə.'
                        const checkbox = document.createElement('input')
                        checkbox.type = 'checkbox';
                        checkbox.id = 'onePaket'
                        checkbox.checked = true
                        label.appendChild(checkbox)
                        label.appendChild(labelText)
                        document.querySelector("#bodyDiv").appendChild(label)
                    } catch(error) {
                        if (count>0){
                            await new Promise((res,rej)=>{setTimeout(()=>{res()},100)})
                            append(count-1)
                        }
                    }};
                append();
                async function downloadAll() {
                    const token = document.querySelector('#MTOKEN').value;
                    const yearFrom = Number(
                        document.querySelector("[name='donemBasYil']").value
                    );
                    const monthFrom = Number(
                        document.querySelector("[name='donemBasAy']").value
                    );
                    const yearTo = Number(
                        document.querySelector("[name='donemBitYil']").value
                    );
                    const monthTo = Number(
                        document.querySelector("[name='donemBitAy']").value
                    );

                    const doc = new DOMParser().parseFromString(
                        await fetch('https://www.e-taxes.gov.az/vedop2/ebyn/dispatch', {
                            headers: {
                                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                                'accept-language': 'en-US,en;q=0.9',
                                'cache-control': 'max-age=0',
                                'content-type': 'application/x-www-form-urlencoded',
                                'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                                'sec-ch-ua-mobile': '?0',
                                'sec-fetch-dest': 'document',
                                'sec-fetch-mode': 'navigate',
                                'sec-fetch-site': 'same-origin',
                                'sec-fetch-user': '?1',
                                'upgrade-insecure-requests': '1',
                            },
                            referrer: 'https://www.e-taxes.gov.az/vedop2/ebyn/dispatch',
                            referrerPolicy: 'strict-origin-when-cross-origin',
                            body: `cmd=BEYANNAMESORGU&TOKEN=${token}`,
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include',
                        }).then((response) => response.text()),
                        'text/html'
                    );

                    const vergiNo = doc.querySelector('[name="vergiNo"]').value;
                    const decType = document.querySelector("[name='beyannameTanim']").value
                    const onePaket = document.querySelector("#onePaket").checked;
                    const declType = document.querySelector("input[type=radio][name='declType']:checked").value;
                    const Paket = new JSZip();
                    const vergiAd = await fetch("https://www.e-taxes.gov.az/vedop2/ebyn/dispatch", {
                        "headers": {
                            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                            "cache-control": "max-age=0",
                            "content-type": "application/x-www-form-urlencoded",
                            "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-fetch-dest": "document",
                            "sec-fetch-mode": "navigate",
                            "sec-fetch-site": "same-origin",
                            "sec-fetch-user": "?1",
                            "upgrade-insecure-requests": "1"
                        },
                        "referrer": "https://www.e-taxes.gov.az/vedop2/ebyn/dispatch",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": `cmd=SICILVDGORUNTULE&TOKEN=${token}`,
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }).then((response) => response.text())
                    .then(html=>new DOMParser().parseFromString(html,'text/html')).then(doc=>doc.querySelector("col.table_header").parentElement.parentElement.querySelector("tbody > tr:nth-child(3) > td:nth-child(2)").textContent)
                    const data = `TOKEN=${token}&cmd=BEYANNAMELISTESI&grupSayi=0&${document.querySelector('[name="sorguTipiN"]').checked ? 'sorguTipiN=1&':''}vergiNo=${vergiNo}&${document.querySelector('[name="sorguTipiB"]').checked ? 'sorguTipiB=1&':''}beyannameTanim=${decType}&${document.querySelector('[name="sorguTipiP"]').checked ? 'sorguTipiP=1&':''}donemBasAy=${monthFrom}&donemBasYil=${yearFrom}&donemBitAy=${monthTo}&donemBitYil=${yearTo}&${document.querySelector('[name="sorguTipiV"]').checked ? 'sorguTipiV=1&':''}vdKodu=10&${document.querySelector('[name="sorguTipiZ"]').checked ? 'sorguTipiZ=1&':''}baslangicTarihi=${new Date().toLocaleDateString('ru')}&bitisTarihi=${new Date().toLocaleDateString('ru')}&${document.querySelector('[name="sorguTipiD"]').checked ? 'sorguTipiD=1&':''}durum=4&${document.querySelector('[name="sorguTipiS"]').checked ? 'sorguTipiS=1&':''}sentType=12${document.querySelector("input[type=checkbox][name='sorguTipiDt']").checked ? '&sorguTipiDt=1&declType='+encodeURI(declType):''}`
                    let xmlName;
                    const decs = await fetch('https://www.e-taxes.gov.az/vedop2/ebyn/dispatch', {
                        headers: {
                            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'accept-language': 'en-US,en;q=0.9',
                            'cache-control': 'max-age=0',
                            'content-type': 'application/x-www-form-urlencoded',
                            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-fetch-dest': 'document',
                            'sec-fetch-mode': 'navigate',
                            'sec-fetch-site': 'same-origin',
                            'sec-fetch-user': '?1',
                            'upgrade-insecure-requests': '1',
                        },
                        referrer: 'https://www.e-taxes.gov.az/vedop2/ebyn/dispatch',
                        referrerPolicy: 'strict-origin-when-cross-origin',
                        body: data,
                        method: 'POST',
                        mode: 'cors',
                        credentials: 'include',
                    }).then((response) => response.text())
                    .then(doc=>{return new DOMParser().parseFromString(doc,'text/html')})
                    .then(doc=>{
                        const Nodes = [...doc.querySelector("form[name='beyannameList'] > center > table > tbody").children]
                        const decNodes = Nodes.splice(3,Nodes.length-1)
                        return decNodes})
                    .then(nodes=>{
                        return nodes.sort((a, b) => {
                            return (stringToDate(b.title) - stringToDate(a.title));
                        })})
                    .then(sortedNodes=>{
                        const decs = []
                        for (let i = 0; i < sortedNodes.length; i++){
                            const decNode = sortedNodes[i]
                            if ((!decs.length || !decs.filter(x=>(x.children?.[7].textContent===decNode.children?.[7].textContent) && (x.children?.[4].textContent===decNode.children?.[4].textContent)).length)) {
                                decs.push(decNode)
                            }
                        }
                        return decs
                    })

                    for (let i = 0; i < decs.length; i++){
                        let dec = decs[i];
                        let url = ''
                        const [USERID, PACKAGE_OID, PACKAGE_NAME] = dec.querySelector('a')
                        .href.replace('javascript:downloadFile(', '')
                        .replace(');', '')
                        .replace(/'/g, '')
                        .split(',')
                        const parts = dec.title.split(' ')
                        const xmlName = parts[2]
                        const date = parts[5]
                        const time = parts[7]
                        let pckg = await localforage.getItem(PACKAGE_OID+'|'+PACKAGE_NAME)
                        let blob;
                        if (pckg){
                            blob = pckg //new Blob([pckg], {type: 'text/plain'});
                        } else {
                            url = `https://www.e-taxes.gov.az/vedop2/ebyn/dispatch?cmd=EDV_EBYN_DOWNLOAD_PACKAGE&USERID=${String(USERID)}&S_USERID=${String(USERID)}&PACKAGE_OID=${PACKAGE_OID}&PACKAGE_NAME=${PACKAGE_NAME}&TOKEN=${token}`
                            let resp = await fetch(
                                url, {
                                    headers: {
                                        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                                        'accept-language': 'en-US,en;q=0.9',
                                        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                                        'sec-ch-ua-mobile': '?0',
                                        'sec-fetch-dest': 'iframe',
                                        'sec-fetch-mode': 'navigate',
                                        'sec-fetch-site': 'same-origin',
                                        'upgrade-insecure-requests': '1',
                                    },
                                    referrer: 'https://www.e-taxes.gov.az/vedop2/ebyn/dispatch',
                                    referrerPolicy: 'strict-origin-when-cross-origin',
                                    body: null,
                                    method: 'GET',
                                    mode: 'cors',
                                    credentials: 'include',
                                }
                            ).catch();
                            blob = await resp.blob()
                            localforage.setItem(PACKAGE_OID+'|'+PACKAGE_NAME, blob)
                        }
                        if (dec.querySelector('td:nth-child(11)').textContent==='Kameral'){
                            const zip = new JSZip()
                            const text = await new Response(blob).text()
                            let xml = new DOMParser().parseFromString(text,'text/xml')
                            const decYear = xml.querySelector('yil')?.textContent
                            const decMonth = xml.querySelector('ay')?.textContent
                            const type = [...document.querySelector('[name="beyannameTanim"]').options].filter(x=>x.value===xml.querySelector('beyanname').getAttribute('kodVer').replace(/_1/g,''))[0].textContent
                            const decType = dec.querySelector('td:nth-child(11)').textContent;
                            if (!onePaket){
                                const zip = new JSZip()
                                zip.file(xmlName + '.xml' , blob)
                                const output = await zip.generateAsync({type:"blob"})
                                download(`${vergiNo} - ${decYear}${decMonth ? ('.' + String('0' + decMonth).slice(-2)):''} - ${decType} - ${date} ${time}.zip`, output)
                                sleep(100)
                            } else {
                                Paket.file(type + '/' + decYear +'/' + decYear + (decMonth ? ('.'+String('0' + decMonth).slice(-2)):'') + ' - ' + date + ' ' + time + ' - ' + xmlName + '.xml' , blob)
                            }
                        } else {
                            const zip = new JSZip()
                            try {
                                const decls = await zip.loadAsync(blob)
                                const files = await decls.files
                                for (let file of Object.values(files)){
                                    const data = await file.async('text')
                                    if (data.includes('Beyanname-Manifest-Version: 1.0')){
                                        continue;
                                    }
                                    if (file.name!==xmlName){
                                        decls.remove(file.name)
                                        continue
                                    }
                                    let xml = new DOMParser().parseFromString(data,'text/xml')
                                    const decYear = xml.querySelector('yil')?.textContent
                                    const decMonth = xml.querySelector('ay')?.textContent
                                    const type = [...document.querySelector('[name="beyannameTanim"]').options].filter(x=>x.value===xml.querySelector('beyanname').getAttribute('kodVer').replace(/_1/g,''))[0].textContent
                                    const decType = dec.querySelector('td:nth-child(11)').textContent;
                                    if (!onePaket){
                                        const output = await zip.generateAsync({type:"blob"})
                                        download(`${vergiNo} - ${decYear}${decMonth ? ('.' + String('0' + decMonth).slice(-2)):''} - ${decType} - ${date} ${time}.zip`,output)
                                        sleep(100)
                                    } else {
                                        const decBlob = new Blob([data],{type: 'text/plain'})
                                        Paket.file(type + '/' + decYear +'/' + decYear + (decMonth ? ('.'+String('0' + decMonth).slice(-2)):'') + ' - ' + date + ' ' + time + ' - ' + xmlName , decBlob)
                                    }
                                }
                            }catch(error){}
                        }
                    }
                    if (onePaket){
                        const blob = await Paket.generateAsync({type:"blob"})
                        download(vergiNo + ' - ' + vergiAd + '.zip',blob)
                    }

                }

            }

        }
    })

    async function refundList(){

        let fromYear = Number(document.querySelector("#year").value)
        let toYear = Number(document.querySelector("#year-2").value)
        let fromMonth = Number(document.querySelector("#packageType2").value)
        let toMonth = Number(document.querySelector("#packageType2-2").value)
        if (!fromYear){
            alert('Başlanğıc ilini daxil edin!')
            return;}
        if (fromYear<1970){
            fromYear = 1970
        }
        if (!toYear){
            toYear = new Date().getFullYear()
        }
        if (!fromMonth){
            fromMonth = 1}
        if (!toMonth){
            toMonth = 12}
        let requests = []
        for (let year = fromYear;year<=toYear;year++){
            for (let month = (year===fromYear?fromMonth:1);month<=(year===toYear?toMonth:12);month++){
                const monthStr = ('0'+month).substr(('0'+month).length-2,2)
                requests.push(fetch("https://qaime.e-taxes.gov.az/service/eqaime.getDeclarationList", {
                    "headers": {
                        "accept": "text/plain, */*; q=0.01",
                        "accept-language": "en-US,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": `year=${year}&type=01&month=${monthStr}`,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"})
                              .then(response=>response.json())
                              .then(response=>response.declList)
                              .then(response=>response.filter(x=>(x.declSumTotalEDV!=='') && x.declDate!==''))
                              .then(response=>response.sort((x,y)=>(stringToDate(y.declDate)-stringToDate(x.declDate)))[0])
                              .then(response=>fetch("https://qaime.e-taxes.gov.az/service/eqaime.getRefundedList", {
                    "headers": {
                        "accept": "text/plain, */*; q=0.01",
                        "accept-language": "en-US,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": `year=${year}&type=01&month=${monthStr}&declOid=${response.declOid}&state=all`,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).catch(()=>{}))
                              .catch(()=>{}))}}
        const refunds = await Promise.allSettled(requests)
        .then(responses=>responses.filter(response=>response.value))
        .then(responses=>Promise.allSettled(responses.map(response=>response.value.json())))
        .then(responses=>responses.map(response=>response.value.refundListDTO))
        const data = []
        data.push(['Dövr','№','Tarix','Seriya','Nömrə','Sətir kodu', 'VÖEN','Adı','Malın ümumi dəyəri','Malın ƏDV dəyəri','Ödənilmiş ümumi dəyər','Ödənilmiş ƏDV'])
        for (let i = 0;i<=refunds.length-1;i++){
            for (let j = 0;j<=refunds[i].length-1;j++){
                try{
                    const refund = refunds[i][j]
                    const temp = []
                    if (refund.qaimeSeria==='Cəmi'){
                        temp.push('01.' + refunds[i][j-1].donem.substr(4,2) + '.' + refunds[i][j-1].donem.substr(0,4));
                        temp.push('');
                        temp.push('');
                        temp.push(refund.qaimeSeria);
                        temp.push(refund.qaimeNum);
                        temp.push(refund.columnCode);
                        temp.push(refund.toVoen);
                        temp.push(refund.payerName);
                        temp.push("'"+refund.umumiEdvsiz.replace(/\./g,','));
                        temp.push("'"+refund.umumiEdv.replace(/\./g,','));
                        temp.push("'"+refund.odenilmisEdvsiz.replace(/\./g,','));
                        temp.push("'"+refund.odenilmisEdv.replace(/\./g,','));
                    } else {
                        temp.push('01.' + refunds[i][j].donem.substr(4,2) + '.' + refunds[i][j].donem.substr(0,4));
                        temp.push(j+1);
                        temp.push(stringToDate(refund.qaimeDate + '000000').toLocaleDateString("ru"));
                        temp.push(refund.qaimeSeria);
                        temp.push(refund.qaimeNum);
                        temp.push(refund.columnCode);
                        temp.push(refund.toVoen);
                        temp.push(refund.payerName);
                        temp.push(refund.umumiEdvsiz.replace(/\./g,','));
                        temp.push(refund.umumiEdv.replace(/\./g,','));
                        temp.push(refund.odenilmisEdvsiz.replace(/\./g,','));
                        temp.push(refund.odenilmisEdv.replace(/\./g,','));
                    }
                    data.push(temp)
                } catch {
                    continue}}
        }
        let newTab = window.open()
        sleep(100)
        const table = newTab.document.createElement('div')
        table.id = 'refund'
        newTab.document.body.appendChild(table)
        {
            const css = newTab.document.createElement('link')
            css.rel='stylesheet'
            css.href = 'https://cdn.jsdelivr.net/npm/handsontable@9.0.2/dist/handsontable.full.min.css'
            newTab.document.head.appendChild(css)
        }
        const hot = new Handsontable(table, {
            //startCols:12,
            copyPaste: true,
            copyPaste: {
                columnsLimit: 25,
                rowsLimit: 50000,
                pasteMode: 'shift_down',
                uiContainer: document.body,
            },
            data:data,
            //rowsLimit: 100,
            //startRows:10,
            //minRows:5,
            //minSpareRows:1,
            rowHeaders: true,
            //colWidths:[100,100,100,100,100,100,1000],
            autoWrapRow:true,
            wordWrap:false,
            autoWrapColumn:true,
            autoWrapRow:true,
            dropdownMenu: true,
            filters: true,
            manualColumnResize: true,
            colHeaders: true,
            columns:[{
                type:'text',
            },{
                type:'text',
            },{},{
                type:'text',
            },{
                type:'text',
            },{
                type:'text',
            },{
                type:'text',
            },{
                type:'text',
            },{
                type:'text',
            },{
                type:'numeric',
            },{
                type:'numeric',
            },{
                type:'numeric',
            },{
                type:'numeric',
            }],
            colHeight:'auto',
            licenseKey: 'non-commercial-and-evaluation',
        });
        //table.style.borderCollapse = 'collapse'
        //newTab.document.head.insertAdjacentHTML('beforeend','<style> table {borderCollapse:collapse} td,th {border: 1px solid black}; </style>')
    }
    async function printList(){
        let popUpsBlocked = false
        try {
            setTimeout(()=>{
                let newTab = window.open(null,'popup','width=1,height=1,left=0,top=0,scrollbars=no');
                sleep(1000)
                if(!newTab) {
                    popUpsBlocked = true
                }
                newTab.close()
            },100)
        } catch {
            window.alert('Brauzerdə Pop-up Blokeri bağlamaq lazımdır!!!')
            return '';
        }
        if (popUpsBlocked) {
            alert('Brauzerdə Pop-up Blokeri bağlamaq lazımdır!!!')
            return '';}
        document.querySelector("#filterButton").click();
        const pages = {'getDocList':['getInboxVHF','inboxList'],
                       'getAllDocList':['getOutboxVHF','outboxList'],
                       'getDrafts':['getDraftboxVHF','draftboxList'],}
        const statuses = {"wf_flow_sign" :"Təsdiq gözləyən",
                          "wf_approve_sign" :"Təsdiqlənmiş",
                          "wf_send_back_for_correction" :"Düzəlişə göndərilmiş",
                          "wf_cancel_app" :"Ləğv edilmiş",
                          "wf_auto_cancel" :"Sistem tərəfindən ləğv edilib",
                          "wf_auto_approve" :"Sistem tərəfindən təsdiqlənmiş",
                          "wf_edit_after_sign" :"Düzəliş edilmiş",
                          "wf_flow_sign_for_correction" :"Təsdiq gözləyən",
                          "wf_cancel_request_sign" :"Ləğvə göndərildi",
                          "wf_cancel_approve_sign" :"Ləğv təsdiqləndi",
                          "wf_imtina_for_correction" :"Düzəlişdən imtina/Təsdiqlənmiş",
                          "wf_imtina_for_cancel_request" :"Ləğvdən imtina/Təsdiqlənmiş"};
        const erDocTypes = {"docType_3":"Malların, işlərin və xidmətlərin təqdim edilməsi qaiməsi",
                            "docType_4":"Malların tam qaytarılması qaiməsi",
                            "docType_13":"Malların qismən qaytarılması qaiməsi",
                            "docType_5":"Qaytarma istisna olmaqla VM-in 163-cü maddəsinə əsasən dəqiqləşdirilmiş qaimə",
                            "docType_11":"Malların agentə/komisyonçuya verilməsi qaiməsi",
                            "docType_12":"Agent/Komisyonçu tərəfindən malların alıcıya təqdim edilməsi qaiməsi",
                            "docType_8":"VM-in 177.5-ci maddəsinə əsasən təqdim edilən qaimə",
                            "docType_9":"Malların emala göndərilməsi qaiməsi",
                            "docType_10":"Malların emaldan qaytarılması qaiməsi",}
        const docTypes = {'0':'Cari'}
        const currentPage = Object.keys(pages).filter(page=>window.location.href.includes(page))[0]
        const filterTaxId = document.querySelector("#voen").value;
        const filterStatus = document.querySelector("#wfState").value;
        const filterType = document.querySelector("#docType").value;
        const filterFromDate = document.querySelector("#startDate").value;
        const filterToDate = document.querySelector("#endDate").value;
        const filterSer = document.querySelector("#vhfSeria").value;
        const filterNumber = document.querySelector("#vhfNum").value;
        if (!filterFromDate){
            alert('Başlanğıc tarixi mütləq qeyd edilməlidir!!!')
            return;
        }
        const lists = []

        for (let page = 1;page<=500;page++){
            const response = await fetch(`https://qaime.e-taxes.gov.az/service/eqaime.${pages[currentPage][0]}`, {
                "headers": {
                    "accept": "text/plain, */*; q=0.01",
                    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest"
                },
                "body": `voen=${filterTaxId}&wfState=${filterStatus}&docType=${filterType}&fromDate=${dateToString(filterFromDate)}&toDate=${dateToString(filterToDate)}&vhfSeria=${filterSer}&vhfNum=${filterNumber}&pagination%5Boffset%5D=${(page-1)*200}&pagination%5Blimit%5D=200`,
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
            }).then(response=>response.json());
            const eqfs = response[pages[currentPage][1]];
            lists.push(...eqfs)
            if (eqfs.length<200){
                break}
        }

        lists.sort((a,b)=>(stringToDate(a.createdDate)-stringToDate(b.createdDate)) || (Number(a.vhfNum)-Number(b.vhfNum)));
        if (!document.querySelector("#userChecker").checked){
            const th = ['№','Tipi','Növü','Vəziyyəti','VÖEN','Ödəyici adı','Tarix','Seriya','Nömrəsi','Qeyd','Əlavə qeyd','Əsas məbləğ','Ödənilməli ƏDV','Yol vergisi','Yekun məbləğ']
            let newTab = window.open()
            const table = newTab.document.createElement('table')
            newTab.document.body.appendChild(table)
            const thead = newTab.document.createElement('thead')
            table.appendChild(thead)
            let tr = thead.insertRow()
            th.forEach(x=>{
                let th = newTab.document.createElement('th')
                th.innerHTML = x
                tr.appendChild(th)
            })
            tr = thead.insertRow()
            for (let x=1;x<=15;x++){
                let th = newTab.document.createElement('th')
                th.innerHTML = "'" + x
                tr.appendChild(th)
            }
            const tbody = newTab.document.createElement('tbody')
            table.appendChild(tbody)
            for (let i = 0;i<lists.length;i++){
                try{
                    const list = lists[i]
                    let row = tbody.insertRow()
                    row.insertCell().innerHTML = i+1
                    row.insertCell().innerHTML = docTypes[list.docType]
                    row.insertCell().innerHTML = erDocTypes[list.erDocType]
                    row.insertCell().innerHTML = statuses[Object.keys(statuses).filter(status=>list.status.includes(status))[0]]
                    row.insertCell().innerHTML = list.voen
                    row.insertCell().innerHTML = list.voenFullname
                    row.insertCell().innerHTML = stringToDate(list.createdDate).toLocaleString('RU-ru').replace(',','')
                    row.insertCell().innerHTML = list.vhfSeria
                    row.insertCell().innerHTML = list.vhfNum
                    row.insertCell().innerHTML = list.vhfMainSubject
                    row.insertCell().innerHTML = list.vhfAddSubject
                    row.insertCell().innerHTML = new String(Round(Number(list.malinUmumiDeger)-Number(list.malinUmumiEdv)-Number(list?.yolVergisi),2)).replace(/\./,',')
                    row.insertCell().innerHTML = new String(list.malinUmumiEdv || 0 ).replace(/\./,',')
                    row.insertCell().innerHTML = new String(list.yolVergisi || 0).replace(/\./,',')
                    row.insertCell().innerHTML = new String(list.malinUmumiDeger || 0).replace(/\./,',')
                } catch {
                    continue}
            }
            let row = tbody.insertRow()
            for (let i = 0;i<th.length;i++){
                if (i===0){
                    const cell = row.insertCell()
                    cell.textContent = ''
                    //cell.colSpan = 2;
                } else if (i===2){
                    const cell = row.insertCell()
                    cell.textContent = 'Cəmi';
                    //cell.colSpan = 9;
                    continue;
                } else if ([11,12,13,14].includes(i)){
                    let sum = 0;
                    for (let j = 0;j<tbody.rows.length-1;j++){
                        sum+=Number(tbody.rows[j].cells[i].textContent.replace(/,/,'.'))
                    }
                    row.insertCell().innerHTML = "'" + new String(Round(sum)).replace('.',',');
                    continue;
                } else {
                    row.insertCell()
                }
            }
            table.style.borderCollapse = 'collapse'
            newTab.document.head.insertAdjacentHTML('beforeend','<style> table {borderCollapse:collapse} td,th {border: 1px solid black}; </style>')
        } else {
            let responses = await Promise.allSettled([].map.call(lists,async x=>{
                let response = await localforage.getItem(x.oid)
                if (response){
                    return Promise.resolve(response)
                } else {return (fetch('https://qaime.e-taxes.gov.az/service/eqaime.printQaime', {
                    'headers': {
                        'accept': 'text/plain, */*; q=0.01',
                        'accept-language': 'en-US,en;q=0.9',
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'sec-ch-ua': '\'Google Chrome\';v=\'87\', \' Not;A Brand\';v=\'99\', \'Chromium\';v=\'87\'',
                        'sec-ch-ua-mobile': '?0',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'x-requested-with': 'XMLHttpRequest'
                    },
                    'body': `docOidList%5B%5D=${x.oid}`,
                    'method': 'POST',
                    'mode': 'cors',
                    'credentials': 'include'
                }).then(res=>res.text()).then(resp=>{
                    localforage.setItem(x.oid,resp)
                    return resp;
                })
                               )}})).then(responses=>Promise.allSettled([].map.call(responses,response=>{
                try {
                    //console.log(response.value)
                    return JSON.parse(response.value)
                } catch (error){
                    //console.log(JSON.parse(response.value))
                    return response.value
                }
            })))
            .then(responses=>responses.map(response=>response.value))
            let htmls = []
            for (let i=0;i<responses.length;i++){
                try {
                    let html = new DOMParser().parseFromString(b64DecodeUnicode(responses[i].htmlList[0]),'text/html')
                    htmls.push(html)
                }catch(error){
                    console.log(error)
                }
            }
            const th = ['№','Tipi','Növü','EQF Statusu','Təqdim edənin VÖEN-i','Təqdim edənin adı','Alcının VÖEN-i','Alcının adı','EQF Tarixi','EQF Seriyası','EQF Nömrəsi','Əsas Qeyd','Əlavə Qeyd','Qaytarmanın tipi','Əsas sənədin seriyası','Əsas sənədin nömrəsi','Əsas Məbləğ','ƏDV Məbləği','Yol vergisi','Ümumi Məbləğ','Sıra №-si','Mal kodu','Mal adı','Barkod','Ölçü vahidi','Malın miqdarı','Malın buraxılış qiyməti','Cəmi qiyməti','Aksiz dərəcəsi','Aksiz məbləği','Cəmi məbləğ','ƏDV-yə cəlb edilən məbləğ','ƏDV-yə cəlb edilməyən məbləğ','ƏDV-dən azad olunan','ƏDV-yə 0 dərəcə ilə cəlb edilən məbləğ','Ödənilməli ƏDV','Yol vergisi məbləği','Yekun məbləğ','Mal/Xidmət']
            let newTab = window.open()
            const table = newTab.document.createElement('table')
            newTab.document.body.appendChild(table)
            const thead = newTab.document.createElement('thead')
            table.appendChild(thead)
            let tr = thead.insertRow()
            th.forEach(x=>{
                let th = newTab.document.createElement('th')
                th.innerHTML = x
                tr.appendChild(th)
            })
            tr = thead.insertRow()
            for (let x=1;x<=th.length;x++){
                let th = newTab.document.createElement('th')
                th.innerHTML = "'" + x
                tr.appendChild(th)
            }
            const tbody = newTab.document.createElement('tbody')
            table.appendChild(tbody)
            for (let i=0; i<htmls.length;i++){
                const html = htmls[i]
                for (let j = 6; j <= html.querySelector('body > table > tbody').childNodes.length-2;j++){
                    let product = html.querySelector('body > table > tbody').childNodes[j]
                    let row = tbody.insertRow()
                    row.insertCell().innerHTML = i+1
                    row.insertCell().innerHTML = docTypes[lists[i].docType]
                    row.insertCell().innerHTML = erDocTypes[lists[i].erDocType]
                    row.insertCell().innerHTML = statuses[Object.keys(statuses).filter(status=>lists[i].status.includes(status))[0]]
                    row.insertCell().innerHTML = html.querySelector('body > p:nth-child(4) > span:nth-child(2)').innerHTML.substring(0,10)
                    row.insertCell().innerHTML = html.querySelector('body > p:nth-child(4) > span:nth-child(2)').innerHTML.substring(11,100)
                    row.insertCell().innerHTML = html.querySelector('body > p:nth-child(4) > span:nth-child(5)').innerHTML.substring(0,10)
                    row.insertCell().innerHTML = html.querySelector('body > p:nth-child(4) > span:nth-child(5)').innerHTML.substring(11,100)
                    row.insertCell().innerHTML = html.querySelector('body > div:nth-child(2) > span:nth-child(8)').innerHTML
                    row.insertCell().innerHTML = html.querySelector('body > div:nth-child(2) > span:nth-child(5)').innerHTML
                    row.insertCell().innerHTML = html.querySelector('body > div:nth-child(2) > span:nth-child(7)').innerHTML
                    row.insertCell().innerHTML = html.querySelector('body > p:nth-child(4) > span:nth-child(8)').innerHTML
                    row.insertCell().innerHTML = html.querySelector('body > p:nth-child(4) > span:nth-child(11)').innerHTML
                    row.insertCell().innerHTML = html.querySelector("body > p:nth-child(4) > span:nth-child(14)")?.innerHTML || ''
                    row.insertCell().innerHTML = html.querySelector("body > p:nth-child(4) > span:nth-child(17)")?.innerHTML || ''
                    row.insertCell().innerHTML = html.querySelector("body > p:nth-child(4) > span:nth-child(20)")?.innerHTML || ''
                    row.insertCell().innerHTML = (j > 6 ? "'":'') + html.querySelector('body > table:nth-child(6) > tbody > tr:last-child > td:nth-child(11) > span').innerHTML.replace('.',',')
                    row.insertCell().innerHTML = (j > 6 ? "'":'') + html.querySelector('body > table:nth-child(6) > tbody > tr:last-child > td:nth-child(16) > span').innerHTML.replace('.',',')
                    row.insertCell().innerHTML = (j > 6 ? "'":'') + html.querySelector('body > table:nth-child(6) > tbody > tr:last-child > td:nth-child(17) > span').innerHTML.replace('.',',')
                    row.insertCell().innerHTML = (j > 6 ? "'":'') + html.querySelector('body > table:nth-child(6) > tbody > tr:last-child > td:nth-child(18) > span').innerHTML.replace('.',',')
                    row.insertCell().innerHTML = j-5
                    row.insertCell().innerHTML = product.childNodes[1].textContent.substring(0,10);
                    row.insertCell().innerHTML = product.childNodes[1].textContent.substring(11,100);
                    row.insertCell().innerHTML = product.childNodes[2].textContent;
                    row.insertCell().innerHTML = product.childNodes[3].textContent;
                    row.insertCell().innerHTML = product.childNodes[4].textContent;
                    row.insertCell().innerHTML = product.childNodes[5].textContent;
                    row.insertCell().innerHTML = product.childNodes[6].textContent;
                    row.insertCell().innerHTML = product.childNodes[7].textContent;
                    row.insertCell().innerHTML = product.childNodes[8].textContent;
                    row.insertCell().innerHTML = product.childNodes[10].textContent;
                    row.insertCell().innerHTML = product.childNodes[11].textContent;
                    row.insertCell().innerHTML = product.childNodes[12].textContent;
                    row.insertCell().innerHTML = product.childNodes[13].textContent;
                    row.insertCell().innerHTML = product.childNodes[14].textContent;
                    row.insertCell().innerHTML = product.childNodes[15].textContent;
                    row.insertCell().innerHTML = product.childNodes[16].textContent;
                    row.insertCell().innerHTML = product.childNodes[17].textContent;
                    row.insertCell().innerHTML = product.childNodes[1].textContent.substring(0,2)=='99'?'Xidmət':'Mal';
                }
            }
            let row = tbody.insertRow()
            for (let c = 0;c<th.length;c++){
                if (c===0){
                    const cell = row.insertCell()
                    //cell.textContent = ''
                    //cell.colSpan = 2;
                    continue
                } else if (c===2){
                    const cell = row.insertCell()
                    cell.textContent = 'Cəmi';
                    //cell.colSpan = 11;
                    continue;
                }else if (range(23,16).includes(c)){
                    const cell = row.insertCell();
                    if ([16,17,18,19].includes(c)){
                        let sum = 0;
                        for (let r = 2;r<table.rows.length-1;r++){
                            if (table.rows[r].cells[9].textContent!==table.rows[r-1].cells[9].textContent || table.rows[r].cells[10].textContent!==table.rows[r-1].cells[10].textContent){
                                sum+=Number(table.rows[r].cells[c].textContent.replace(',','.'))}
                        }
                        cell.textContent = "'" + new String(Round(sum)).replace('.',',');
                        continue;
                    }
                    if (range(13,25).includes(c)){
                        let sum = 0;
                        for (let r = 2;r<table.rows.length-1;r++){
                            sum+=Number(table.rows[r].cells[c].textContent.replace(',','.'))
                        }
                        cell.textContent = "'" + new String(Round(sum)).replace('.',',');
                        continue;
                    }
                } else {
                    row.insertCell()
                }
            }
            table.style.borderCollapse = 'collapse'
            newTab.document.head.insertAdjacentHTML('beforeend','<style> table {borderCollapse:collapse} td,th {border: 1px solid black}; </style>')
        }

    }
    function b64DecodeUnicode (str) {
        /*// Going backwards: from bytestream, to percent-encoding, to original string.*/
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };

    function range(size, startAt = 0) {
        return [...Array(size).keys()].map(i => i + startAt);
    }

    function Round(number,digits=2){
        return Math.round(number*10**digits)/10**digits
    }

    function stringToDate(string){
        const [_,year,month,day,hour,minute,second,ms] = string.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{0,3})/)
        return new Date(year,month-1,day,hour,minute,second,ms)
    }
    function dateToString(datetime){
        try {
            const [date,time] = datetime.split(' ')
            const [day,month,year] = date.split('.')
            const [hour,minute,second] = time.split(':')
            return year+month+day+hour+minute+(second||'00')
        } catch {
            return ''}
    }
    function download(filename, blob) {
        let element = document.createElement('a');
        element.href = URL.createObjectURL(blob);
        element.setAttribute('download', filename);
        element.click();
    }
    async function sleep(ms){
        await new Promise(resolve=>{
            setTimeout(()=>resolve(),ms)
        })
    }

    (()=>{

        const requests = []

        const children = document.querySelector("#default-datatable > tbody").children

        for (let i = 0;i<children.length;i++){
            requests.push(fetch("https://qaime.e-taxes.gov.az/service/eqaime.printQaime", {
                "headers": {
                    "accept": "text/plain, */*; q=0.01",
                    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-ch-ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest"
                },
                //"referrer": "https://qaime.e-taxes.gov.az/getDocData?docOid=61374bba51689&docNo=EBBH712022",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": "docOidList%5B%5D=" + children[i].dataset.docoid,
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
            }))
        }
        Promise.allSettled(requests)
            .then(responses=>Promise.allSettled(responses.map(response=>response.value.json())))
            .then(responses=>responses.map(response=>b64DecodeUnicode(response.value.htmlList[0])))
            .then(responses=>responses.forEach(response=>{
            try {
                const parsedHtml = new DOMParser().parseFromString(response,'text/html')
                let filename = parsedHtml.querySelector("span:nth-child(8)").textContent + ' ' + parsedHtml.querySelector("span:nth-child(5)").textContent + ' ' + parsedHtml.querySelector("span:nth-child(7)").textContent + ' ' + parsedHtml.querySelector("body > p:nth-child(4) > span:nth-child(5)").textContent + '.html'
                filename = filename.replace(/"/g,"''").replace(/\:/,'.')
                download(filename,new Blob([response],{type: 'text/plain'}))

            }catch{}
        }))

        function b64DecodeUnicode (str) {
            /*// Going backwards: from bytestream, to percent-encoding, to original string.*/
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        };

        function download(filename, blob) {
            let element = document.createElement('a');
            element.href = URL.createObjectURL(blob);
            element.setAttribute('download', filename);
            element.click();
        }
    })
})();
